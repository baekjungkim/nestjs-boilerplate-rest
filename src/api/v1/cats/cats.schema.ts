import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Document, SchemaOptions } from 'mongoose';
import { Comment } from '../comments/comments.schema';

const options: SchemaOptions = {
  collection: 'Cat',
  timestamps: true,
  versionKey: false,
};

@Schema(options)
export class Cat extends Document {
  @ApiProperty()
  @Prop({
    required: true,
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @Prop({
    default:
      'https://raw.githubusercontent.com/amamov/teaching-nestjs-a-to-z/main/images/1.jpeg',
  })
  @IsString()
  imgUrl: string;

  // readonly readOnlyData: {
  //   id: string;
  //   email: string;
  //   name: string;
  //   imgUrl: string;
  //   // comments: Comment[];
  // };

  readonly comments: Comment[];
}

const _CatSchema = SchemaFactory.createForClass(Cat);

// _CatSchema.virtual('readOnlyData').get(function (this: Cat) {
//   return {
//     id: this.id,
//     email: this.email,
//     name: this.name,
//     imgUrl: this.imgUrl,
//     // comments: this.comments,
//   };
// });

_CatSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'info',
});

_CatSchema.set('toObject', { virtuals: true });
_CatSchema.set('toJSON', { virtuals: true });

export const CatSchema = _CatSchema;
