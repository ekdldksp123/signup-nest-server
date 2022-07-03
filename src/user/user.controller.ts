import { BooleanResponseDto } from '@common/response-helper/boolean-response.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SignInReqeustDto } from './dto/sign-in.request.dto';
import { SignUpReqeustDto } from './dto/sign-up.request.dto';
import { SignUpResponseDto } from './dto/sign-up.response.dto';
import { UserService } from './user.service';

@ApiTags('회원')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '회원가입' })
  @Post('sign-in')
  async signInUser(@Body() reqDto: SignInReqeustDto): Promise<BooleanResponseDto> {
    return new BooleanResponseDto(await this.userService.signInUser(reqDto));
  }

  @ApiOperation({ summary: '로그인' })
  @Post('sign-up')
  async signUpUser(@Body() reqDto: SignUpReqeustDto): Promise<SignUpResponseDto> {
    return new SignUpResponseDto(await this.userService.signUpUser(reqDto));
  }
}
