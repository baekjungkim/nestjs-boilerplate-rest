import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ApiFile } from '../../../../common/decorators/api.decorator';
import { CurrentCat } from '../../../../common/decorators/cats.decorator';
import { multerOptions } from '../../../../common/utils/multer.options';
import { BaseErrorOutput } from '../../../dtos/base.dto';
import { LoginInput, LoginOutput } from '../../auth/dtos/login.dto';
import { JwtAuthGuard } from '../../auth/jwt/jwt.guard';
import { AuthService } from '../../auth/services/auth.service';
import { CatsCreateInput, CatsCreateOutput } from '../dtos/cats.create.dto';
import { AllCatsReadOnlyOutput, CatsReadOnlyOutput } from '../dtos/cats.dto';
import { Cat } from '../cats.schema';
import { CatsService } from '../services/cats.service';

@ApiTags('Cats')
@Controller({ path: 'cats', version: '1' })
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly authService: AuthService,
  ) {}

  /**
   * 전체조회
   * @returns AllCatsReadOnlyOutput
   */
  @Get()
  @ApiOkResponse({
    type: AllCatsReadOnlyOutput,
  })
  getAllCats() {
    return this.catsService.getAllCats();
  }

  /**
   * 로그인 cat 조회
   * @param cat
   * @returns CatsReadOnlyOutput
   */
  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('TOKEN')
  @ApiOkResponse({
    type: CatsReadOnlyOutput,
  })
  @ApiUnauthorizedResponse({
    type: BaseErrorOutput,
  })
  getCurrentCat(@CurrentCat() cat: Cat) {
    return {
      id: cat.id,
      name: cat.name,
      email: cat.email,
      imgUrl: cat.imgUrl,
    };
  }

  /**
   * 회원가입
   * @param catsCreateInput
   * @returns CatsCreateOutput
   */
  @Post()
  @ApiBody({ type: CatsCreateInput })
  @ApiCreatedResponse({
    type: CatsCreateOutput,
  })
  @ApiConflictResponse({
    type: BaseErrorOutput,
  })
  async signUp(@Body() catsCreateInput: CatsCreateInput) {
    return this.catsService.signUp(catsCreateInput);
  }

  /**
   * 로그인
   * @param loginInput
   * @returns LoginOutput
   */
  @Post('login')
  @ApiBody({ type: LoginInput })
  @ApiCreatedResponse({
    type: LoginOutput,
  })
  @ApiConflictResponse({
    type: BaseErrorOutput,
  })
  async logIn(@Body() loginInput: LoginInput) {
    return this.authService.jwtLogin(loginInput);
  }

  /**
   * 이미지 업로드
   * @param cat
   * @param files
   * @returns CatsReadOnlyOutput
   */
  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('image', 10, multerOptions('cats')))
  @ApiBearerAuth('TOKEN')
  @ApiConsumes('multipart/form-data')
  @ApiFile('image')
  @ApiCreatedResponse({
    type: CatsReadOnlyOutput,
  })
  @ApiUnauthorizedResponse({
    type: BaseErrorOutput,
  })
  uploadFile(
    @CurrentCat() cat: Cat,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.catsService.uploadImg(cat, files);
  }
}
