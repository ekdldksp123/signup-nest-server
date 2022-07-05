import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SignInReqeustDto } from './dto/sign-in.request.dto';
import { SignInResponseDto } from './dto/sign-in.response.dto';
import { SignUpReqeustDto } from './dto/sign-up.request.dto';
import { User } from './schema/user.schema';
import { UserService } from './user.service';

@ApiTags('회원')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '회원가입' })
  @Post('sign-up')
  async signInUser(@Body() reqDto: SignUpReqeustDto): Promise<User> {
    return await this.userService.signUpUser(reqDto);
  }

  @ApiOperation({ summary: '로그인' })
  @Post('sign-in')
  async signUpUser(@Body() reqDto: SignInReqeustDto): Promise<SignInResponseDto> {
    return new SignInResponseDto(await this.userService.signInUser(reqDto));
  }

  @ApiOperation({ summary: '회원 데이터 삭제' })
  @Get('remove-users')
  async removeUsers() {
    return this.userService.removeUsers();
  }
}
