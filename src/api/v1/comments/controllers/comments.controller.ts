import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CurrentCat } from '../../../../common/decorators/cats.decorator';
import { BaseErrorOutput } from '../../../dtos/base.dto';
import { JwtAuthGuard } from '../../auth/jwt/jwt.guard';
import { Cat } from '../../cats/cats.schema';
import { CommentOutput } from '../dtos/comment.dto';
import { CommentCreateInput } from '../dtos/comments.create.dto';
import { CommentsService } from '../services/comments.service';

@ApiTags('Comments')
@Controller({ path: 'comments', version: '1' })
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  @ApiOkResponse({ type: CommentOutput })
  async getAllComments() {
    return this.commentsService.getAllComments();
  }

  @Post(':id')
  @UseGuards(JwtAuthGuard)
  @ApiUnauthorizedResponse({
    type: BaseErrorOutput,
  })
  async create(
    @Param('id') infoId: string,
    @CurrentCat() author: Cat,
    @Body() commentCreateInput: CommentCreateInput,
  ) {
    return this.commentsService.create(infoId, author.id, commentCreateInput);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiUnauthorizedResponse({
    type: BaseErrorOutput,
  })
  async addLike(@Param('id') infoId: string) {
    return this.commentsService.addLike(infoId);
  }
}
