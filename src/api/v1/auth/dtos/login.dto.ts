import { ApiProperty, PickType } from '@nestjs/swagger';
import { BaseOutput } from '../../../dtos/base.dto';
import { Cat } from '../../cats/schemas/cats.schema';

export class LoginInput extends PickType(Cat, ['email', 'password']) {}

export abstract class LoginOutputData {
  @ApiProperty()
  token: string;
}

export abstract class LoginOutput extends BaseOutput {
  @ApiProperty({ type: LoginOutputData })
  data: LoginOutputData;
}
