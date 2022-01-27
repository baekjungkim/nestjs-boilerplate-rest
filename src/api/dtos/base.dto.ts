import { ApiProperty } from '@nestjs/swagger';

export abstract class BaseOutput {
  @ApiProperty()
  ok: true;
}

export abstract class BaseErrorOutput {
  @ApiProperty()
  ok: false;

  @ApiProperty()
  timestamp: string;

  @ApiProperty()
  path: string;

  @ApiProperty({
    example: 'number',
  })
  statusCode: number;

  @ApiProperty()
  error: string;

  @ApiProperty({
    example: 'string | string[]',
  })
  message: string | string[];
}
