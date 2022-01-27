import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CurrentCat } from '../../../../common/decorators/cats.decorator';
import { BaseErrorOutput } from '../../../dtos/base.dto';
import { LoginInput, LoginOutput } from '../../auth/dtos/login.dto';
import { JwtAuthGuard } from '../../auth/jwt/jwt.guard';
import { AuthService } from '../../auth/services/auth.service';
import { CatsCreateInput, CatsCreateOutput } from '../dtos/cats-create.dto';
import { CatsReadOnlyOutput } from '../dtos/cats.dto';
import { Cat } from '../schemas/cats.schema';
import { CatsService } from '../services/cats.service';

@ApiTags('Cats')
@Controller({ path: 'cats', version: '1' })
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly authService: AuthService,
  ) {}

  @ApiBearerAuth('TOKEN')
  @ApiOkResponse({
    type: CatsReadOnlyOutput,
  })
  @ApiUnauthorizedResponse({
    type: BaseErrorOutput,
  })
  @Get('me')
  @UseGuards(JwtAuthGuard)
  getCurrentCat(@CurrentCat() cat: Cat) {
    return cat.readOnlyData;
  }

  @ApiBody({ type: CatsCreateInput })
  @ApiCreatedResponse({
    type: CatsCreateOutput,
  })
  @ApiConflictResponse({
    type: BaseErrorOutput,
  })
  @Post()
  async signUp(@Body() catsCreateInput: CatsCreateInput) {
    return this.catsService.signUp(catsCreateInput);
  }

  @ApiBody({ type: LoginInput })
  @ApiCreatedResponse({
    type: LoginOutput,
  })
  @ApiConflictResponse({
    type: BaseErrorOutput,
  })
  @Post('login')
  async logIn(@Body() loginInput: LoginInput) {
    return this.authService.jwtLogin(loginInput);
  }

  @Post('upload/cats')
  uploadCatImg() {
    return 'upload img';
  }
}
