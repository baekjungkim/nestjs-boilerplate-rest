import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  // GET cats/
  @Get()
  getAllcat() {
    console.log('cats');
    return this.catsService.getAllCat();
  }
  // GET cats/:id
  @Get(':id')
  getOneCat(@Param('id') param) {
    console.log(param);
    // console.log(typeof param);
    return 'one cat';
  }

  // POST cats/
  @Post()
  createCat() {
    return 'create cat';
  }

  // PUT cats/:id
  @Put(':id')
  updateCat() {
    return 'update cat';
  }

  // PATCH cats/:id
  @Patch(':id')
  updatePartialCat() {
    return 'update partial cat';
  }

  // DELETE cats/:id
  @Delete(':id')
  deleteCat() {
    return 'delete cat';
  }
}
