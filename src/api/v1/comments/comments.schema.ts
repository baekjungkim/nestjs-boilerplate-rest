import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { Document, SchemaOptions, Types } from 'mongoose';

const options: SchemaOptions = {
  collection: 'Comment',
  timestamps: true,
  versionKey: false,
};

@Schema(options)
export class Comment extends Document {
  @ApiProperty({ description: '작성자' })
  @Prop({ type: Types.ObjectId, required: true, ref: 'Cat' })
  @IsNotEmpty()
  author: Types.ObjectId;

  @ApiProperty()
  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  contents: string;

  @ApiProperty()
  @Prop({ default: 0 })
  @IsPositive()
  like: number;

  @ApiProperty({ description: '게시물' })
  @Prop({ type: Types.ObjectId, required: true, ref: 'cats' })
  @IsNotEmpty()
  info: Types.ObjectId;
}

const _CommentSchema = SchemaFactory.createForClass(Comment);

_CommentSchema.pre('find', function () {
  this.populate({ path: 'author', select: 'id email name imgUrl' });
});

export const CommentSchema = _CommentSchema;
