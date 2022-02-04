import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatsRepository } from '../../cats/cats.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginInput } from '../dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly catsRepository: CatsRepository,
    private readonly jwtService: JwtService,
  ) {}

  async jwtLogin({ email, password }: LoginInput) {
    // * 해당 email 존재 확인
    const cat = await this.catsRepository.findCatByEmail(email);
    if (!cat) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.');
    }

    // * password 일치 확인
    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      cat.password,
    );
    if (!isPasswordValidated) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.');
    }

    const payload = { email: cat.email, sub: cat.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
