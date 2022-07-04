import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/schema/user.schema';

export class UserDto {
  @ApiProperty({ description: '회원가입 요청에 대한 응답' })
  result: User;

  constructor(user: User) {
    this.result = user;
  }
}
