import { ApiProperty, PickType } from '@nestjs/swagger';
import { BaseOutput } from '../../../dtos/base.dto';
import { Cat } from '../schemas/cats.schema';

export class CatsCreateInput extends PickType(Cat, [
  'email',
  'name',
  'password',
]) {}

export abstract class CatsCreateOutputData extends PickType(Cat, [
  'id',
  'email',
  'name',
]) {}

export abstract class CatsCreateOutput extends BaseOutput {
  @ApiProperty()
  data: CatsCreateOutputData;
}
