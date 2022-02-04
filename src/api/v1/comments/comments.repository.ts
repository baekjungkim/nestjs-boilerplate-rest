import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from './comments.schema';

@Injectable()
export class CommentsRepository {
  constructor(
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
  ) {}

  /**
   * 전체 Comment 조회
   * @returns Comment[]
   */
  async findAll(): Promise<Comment[]> {
    return this.commentModel.find();
  }

  /**
   * Id로 Comment 조회
   * @param id
   * @returns Comment
   */
  async findById(id: string): Promise<Comment> {
    return this.commentModel.findById(id);
  }

  /**
   * Comment 등록
   * @param author
   * @param info
   * @param contents
   * @returns Comment
   */
  async create(
    author: string,
    info: string,
    contents: string,
  ): Promise<Comment> {
    return this.commentModel.create({ author, info, contents });
  }

  /**
   * comment like 추가
   * @param id
   * @returns Comment
   */
  async addLike(id: string): Promise<Comment> {
    const comment = await this.findById(id);
    comment.like += 1;
    return comment.save();
  }

  /**
   * comment like 삭제
   * @param id
   * @returns Comment
   */
  async removeLike(id: string): Promise<Comment> {
    const comment = await this.findById(id);
    comment.like -= 1;
    return comment.save();
  }
}
