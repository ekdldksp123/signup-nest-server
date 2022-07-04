import { ApiProperty } from '@nestjs/swagger';
import { TokenDto } from 'src/auth/dto/token.dto';

export class SignInResponseDto {
  @ApiProperty()
  result: TokenDto;
  constructor(dto: TokenDto) {
    this.result = dto;
  }
}
