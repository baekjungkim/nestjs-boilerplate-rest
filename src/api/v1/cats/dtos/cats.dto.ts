import { ApiProperty, PickType } from '@nestjs/swagger';
import { BaseOutput } from '../../../dtos/base.dto';
import { Cat } from '../schemas/cats.schema';

export abstract class CatsReadOnlyData extends PickType(Cat, [
  'email',
  'name',
  'imgUrl',
]) {
  @ApiProperty()
  id: string;
}

export abstract class CatsReadOnlyOutput extends BaseOutput {
  @ApiProperty({ type: CatsReadOnlyData })
  data: CatsReadOnlyData;
}

export abstract class AllCatsReadOnlyOutput extends BaseOutput {
  @ApiProperty({ type: [CatsReadOnlyData] })
  data: CatsReadOnlyData[];
}
