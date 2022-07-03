import { ApiProperty } from '@nestjs/swagger';

export class IdxResponseDto {
  @ApiProperty()
  result: number;

  constructor(idx: number) {
    this.result = idx;
  }
}
