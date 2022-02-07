import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { PromiseResult } from 'aws-sdk/lib/request';
import * as path from 'path';

@Injectable()
export class AwsService {
  private readonly S3: AWS.S3;
  public readonly S3_BUCKET_NAME: string;

  constructor() {
    this.S3 = new AWS.S3({
      accessKeyId: process.env.AWS_S3_ACCESS_KEY,
      secretAccessKey: process.env.AWS_S3_SECRET_KEY,
      region: process.env.AWS_S3_REGION,
    });
    this.S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;
  }

  async uploadFileToS3(
    folder: string,
    file: Express.Multer.File,
  ): Promise<TUploadResturn> {
    const key = `${folder}/${Date.now()}_${path.basename(
      file.originalname,
    )}`.replace(/ /g, '');

    const S3Object = await this.S3.putObject({
      Bucket: this.S3_BUCKET_NAME,
      Key: key,
      Body: file.buffer,
      ACL: 'public-read',
      ContentType: file.mimetype,
    }).promise();
    return { key, S3Object, contentType: file.mimetype };
  }

  async uploadFilesToS3(
    folder: string,
    files: Express.Multer.File[],
  ): Promise<TUploadResturn[]> {
    const results = [];
    for await (const file of files) {
      const key = `${folder}/${Date.now()}_${path.basename(
        file.originalname,
      )}`.replace(/ /g, '');

      const S3Object = await this.S3.putObject({
        Bucket: this.S3_BUCKET_NAME,
        Key: key,
        Body: file.buffer,
        ACL: 'public-read',
        ContentType: file.mimetype,
      }).promise();

      results.push({ key, S3Object, contentType: file.mimetype });
    }

    return results;
  }

  async deleteS3Object(
    key: string,
    callback?: (err: AWS.AWSError, data: AWS.S3.DeleteObjectOutput) => void,
  ): Promise<boolean> {
    await this.S3.deleteObject(
      {
        Bucket: this.S3_BUCKET_NAME,
        Key: key,
      },
      callback,
    ).promise();
    return true;
  }

  public getS3FileUrl(objectKey: string) {
    return `https://${this.S3_BUCKET_NAME}.S3.amazonaws.com/${objectKey}`;
  }
}

type TUploadResturn = {
  key: string;
  S3Object: PromiseResult<AWS.S3.PutObjectOutput, AWS.AWSError>;
  contentType: string;
};
