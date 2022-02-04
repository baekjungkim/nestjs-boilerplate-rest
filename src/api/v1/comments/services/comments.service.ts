import { Injectable } from '@nestjs/common';
import { CatsRepository } from '../../cats/cats.repository';
import { CommentsRepository } from '../comments.repository';
import { Comment } from '../comments.schema';
import { CommentCreateInput } from '../dtos/comments.create.dto';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentsRepository: CommentsRepository,
    private readonly catsRepository: CatsRepository,
  ) {}

  /**
   * 전체 Comment 조회
   * @returns Comment[]
   */
  async getAllComments(): Promise<Comment[]> {
    return this.commentsRepository.findAll();
  }

  /**
   * Comment 등록
   * @param infoId
   * @param authorId
   * @param CommentCreateInput
   * @returns Comment
   */
  async create(
    infoId: string,
    authorId: string,
    { contents }: CommentCreateInput,
  ): Promise<Comment> {
    const targetCat = await this.catsRepository.findCatById(infoId);
    const authorCat = await this.catsRepository.findCatById(authorId);

    const comment = await this.commentsRepository.create(
      authorCat._id,
      targetCat._id,
      contents,
    );

    return comment;
  }

  /**
   * 좋아요 등록
   * @param infoId
   * @returns Comment
   */
  async addLike(infoId: string): Promise<Comment> {
    return this.commentsRepository.addLike(infoId);
  }

  /**
   * 좋아요 해제
   * @param infoId
   * @returns Comment
   */
  async removeLike(infoId: string): Promise<Comment> {
    return this.commentsRepository.removeLike(infoId);
  }
}
