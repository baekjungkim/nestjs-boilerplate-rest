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
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CurrentCat } from '../../../../common/decorators/cats.decorator';
import { BaseErrorOutput } from '../../../dtos/base.dto';
import { JwtAuthGuard } from '../../auth/jwt/jwt.guard';
import { Cat } from '../../cats/cats.schema';
import { CommentOutput, CommentsOutput } from '../dtos/comment.dto';
import {
  CommentCreateInput,
  CommentCreateOutput,
} from '../dtos/comments.create.dto';
import { CommentsService } from '../services/comments.service';

@ApiTags('Comments')
@Controller({ path: 'comments', version: '1' })
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  /**
   * 댓글 전체조회
   * @returns CommentsOutput
   */
  @Get()
  @ApiOkResponse({ type: CommentsOutput })
  async getAllComments() {
    return this.commentsService.getAllComments();
  }

  /**
   * 댓글 등록
   * @param infoId
   * @param author
   * @param commentCreateInput
   * @returns CommentCreateOutput
   */
  @Post(':id')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({
    type: CommentCreateOutput,
  })
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

  /**
   * 댓글 좋아요
   * @param infoId
   * @returns CommentOutput
   */
  @Patch(':id/like/add')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    type: CommentOutput,
  })
  @ApiUnauthorizedResponse({
    type: BaseErrorOutput,
  })
  async addLike(@Param('id') infoId: string) {
    return this.commentsService.addLike(infoId);
  }

  /**
   * 댓글 좋아요 해제
   * @param infoId
   * @returns CommentOutput
   */
  @Patch(':id/like/remove')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    type: CommentOutput,
  })
  @ApiUnauthorizedResponse({
    type: BaseErrorOutput,
  })
  async removeLike(@Param('id') infoId: string) {
    return this.commentsService.removeLike(infoId);
  }
}
