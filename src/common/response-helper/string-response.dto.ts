import { ApiProperty } from '@nestjs/swagger';

export class StringResponseDto {
  @ApiProperty({ description: '' })
  result: string;

  constructor(string: string) {
    this.result = string;
  }
}
