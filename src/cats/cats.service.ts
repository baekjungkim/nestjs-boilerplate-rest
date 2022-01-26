import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  getAllCat() {
    return { cats: 'get all cat' };
  }
}
