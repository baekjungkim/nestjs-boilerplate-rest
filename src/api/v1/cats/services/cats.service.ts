import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CatsCreateInput } from '../dtos/cats-create.dto';
import { CatsRepository } from '../repositories/cats.repository';

@Injectable()
export class CatsService {
  constructor(private readonly catsRepository: CatsRepository) {}

  /**
   * 회원가입
   * @param CatsCreateInput
   * @returns Cat.readOnlyData
   */
  async signUp({ email, name, password }: CatsCreateInput) {
    // * 해당 email 조회
    const isCatExist = await this.catsRepository.existsByEmail(email);
    // * 해당 email 존재일 떄
    if (isCatExist) {
      throw new ConflictException('해당하는 고양이는 이미 존재합니다');
    }
    // * 비밀번호 hash
    const hashedPassword = await bcrypt.hash(password, 10);
    // * 유저 저장
    const cat = await this.catsRepository.create({
      email,
      name,
      password: hashedPassword,
    });

    return cat.readOnlyData;
  }
}
