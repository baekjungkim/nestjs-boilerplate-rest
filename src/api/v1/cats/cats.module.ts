import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { CatsController } from './controllers/cats.controller';
import { CatsRepository } from './cats.repository';
import { Cat, CatSchema } from './cats.schema';
import { CatsService } from './services/cats.service';
import { Comment, CommentSchema } from '../comments/comments.schema';
import { AwsService } from '../aws/aws.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Cat.name, schema: CatSchema },
      { name: Comment.name, schema: CommentSchema },
    ]),
    forwardRef(() => AuthModule),
  ],
  controllers: [CatsController],
  providers: [CatsService, CatsRepository, AwsService],
  exports: [CatsService, CatsRepository],
})
export class CatsModule {}
