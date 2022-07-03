import { ApiProperty } from '@nestjs/swagger';
import { TokenDto } from 'src/auth/dto/token.dto';

export class SignUpResponseDto {
  @ApiProperty()
  result: TokenDto;
  constructor(dto: TokenDto) {
    this.result = dto;
  }
}
