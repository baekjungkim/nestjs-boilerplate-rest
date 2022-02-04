import { ApiProperty, PickType } from '@nestjs/swagger';
import { BaseOutput } from '../../../dtos/base.dto';
import { Cat } from '../cats.schema';
import { CatsReadOnlyData } from './cats.dto';

export class CatsCreateInput extends PickType(Cat, [
  'email',
  'name',
  'password',
]) {}

export abstract class CatsCreateOutput extends BaseOutput {
  @ApiProperty({ type: CatsReadOnlyData })
  data: CatsReadOnlyData;
}
