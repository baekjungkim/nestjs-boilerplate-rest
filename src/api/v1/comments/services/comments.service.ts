import { Injectable } from '@nestjs/common';
import { CatsRepository } from '../../cats/cats.repository';
import { CommentsRepository } from '../comments.repository';
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
  async getAllComments() {
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
  ) {
    const targetCat = await this.catsRepository.findCatById(infoId);
    const authorCat = await this.catsRepository.findCatById(authorId);

    const comment = await this.commentsRepository.create(
      authorCat._id,
      targetCat._id,
      contents,
    );

    return comment;
  }

  async addLike(infoId: string) {
    console.log(infoId);
    return 'create comment';
  }
}
