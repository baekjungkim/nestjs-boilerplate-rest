import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CatsCreateInput } from '../dtos/cats-create.dto';
import { Cat } from '../schemas/cats.schema';

@Injectable()
export class CatsRepository {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  /**
   * Email 존재여부 조회
   * @param email
   * @returns boolean
   */
  async existsByEmail(email: string): Promise<boolean> {
    return this.catModel.exists({ email });
  }

  /**
   * 회원가입
   * @param CatsCreateInput
   * @returns Cat
   */
  async create(cat: CatsCreateInput): Promise<Cat> {
    return this.catModel.create(cat);
  }

  /**
   * email로 Cat 조회
   * @param email
   * @returns Cat
   */
  async findCatByEmail(email: string): Promise<Cat> {
    return this.catModel.findOne({ email });
  }

  /**
   * id Cat 조회
   * @param id
   * @returns Cat
   */
  async findCatById(id: string): Promise<Cat> {
    return this.catModel.findById(id);
  }
}
