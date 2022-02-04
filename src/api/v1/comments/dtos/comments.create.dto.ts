import { PickType } from '@nestjs/swagger';
import { Comment } from '../comments.schema';

export class CommentCreateInput extends PickType(Comment, ['contents']) {}
