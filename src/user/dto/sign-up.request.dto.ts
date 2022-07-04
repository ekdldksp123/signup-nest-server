import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches } from 'class-validator';

export class SignUpReqeustDto {
  @ApiProperty({ description: '회원 이름' })
  @IsString()
  userName: string;

  @ApiProperty({ description: '회원 아이디' })
  @IsEmail()
  userEmail: string;

  @ApiProperty({ description: '회원 비밀번호' })
  @IsString()
  @Matches(/^(?!([A-Za-z]+|[~!@#$%^&*()_+=]+|(?=[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{8,12}$/)
  userPassword: string;
}
