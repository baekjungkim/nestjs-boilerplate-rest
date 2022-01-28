import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CatsCreateInput } from '../dtos/cats-create.dto';
import { CatsRepository } from '../repositories/cats.repository';
import { Cat } from '../schemas/cats.schema';

@Injectable()
export class CatsService {
  constructor(private readonly catsRepository: CatsRepository) {}

  /**
   * 전체조회
   * @returns readOnlyCats
   */
  async findAllCat() {
    const allCats = await this.catsRepository.findAll();
    const cats = allCats.map((cat) => cat.readOnlyData);
    return cats;
  }

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

  async uploadImg(cat: Cat, files: Express.Multer.File[]) {
    const fileName = `cats/${files[0].filename}`;
    const newCat = await this.catsRepository.updateImg(cat.id, fileName);
    return newCat.readOnlyData;
  }
}
