import { PickType } from '@nestjs/swagger';
import { Comment } from '../comments.schema';
import { CommentOutput } from './comment.dto';

export class CommentCreateInput extends PickType(Comment, ['contents']) {}

export abstract class CommentCreateOutput extends CommentOutput {}
