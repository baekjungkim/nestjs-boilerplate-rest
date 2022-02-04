import { PickType } from '@nestjs/swagger';
import { BaseOutput } from '../../../dtos/base.dto';
import { Comment } from '../comments.schema';

export abstract class CommentOutputData extends PickType(Comment, [
  'id',
  'author',
  'contents',
  'like',
  'info',
]) {}

export abstract class CommentOutput extends BaseOutput {
  data: CommentOutputData;
}
