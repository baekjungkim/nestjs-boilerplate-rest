import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BaseErrorOutput } from '../../../dtos/base.dto';
import { CatsCreateInput, CatsCreateOutput } from '../dtos/cats-create.dto';
import { CatsService } from '../services/cats.service';

@ApiTags('Cats')
@Controller({ path: 'cats', version: '1' })
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  getCurrentCat() {
    return 'current cat';
  }

  @ApiBody({ type: CatsCreateInput })
  @ApiCreatedResponse({
    description: '성공',
    type: CatsCreateOutput,
  })
  @ApiConflictResponse({
    description: '실패',
    type: BaseErrorOutput,
  })
  @Post()
  async signUp(@Body() body: CatsCreateInput) {
    return this.catsService.signUp(body);
  }

  @Post('login')
  async logIn() {
    return 'login';
  }

  @Post('logout')
  logOut() {
    return 'logout';
  }

  @Post('upload/cats')
  uploadCatImg() {
    return 'upload img';
  }
}
