import { Inject, Injectable } from '@nestjs/common';
import { SignInReqeustDto } from './dto/sign-in.request.dto';
import { SignUpReqeustDto } from './dto/sign-up.request.dto';
import bcrypt from 'bcryptjs';
import { AuthService } from 'src/auth/auth.service';
import { TokenDto } from 'src/auth/dto/token.dto';
import { Model } from 'mongoose';

type CreateUserType = {
  userEmail: string;
  userName: string;
  userPassword: string;
};
@Injectable()
export class UserService {
  constructor(
    private authService: AuthService,
    @Inject('User_MODEL') private readonly userModel: Model<CreateUserType>
  ) {}

  async signInUser(reqDto: SignInReqeustDto) {
    //TODO 받은 회원가입용 데이터 몽고디비에 저장
    const user: CreateUserType = {
      userEmail: reqDto.userEmail,
      userName: reqDto.userName,
      userPassword: await bcrypt.hash(reqDto.userPassword, 12),
    };
    // this.userModel.create(user);

    return true;
  }

  async signUpUser(reqDto: SignUpReqeustDto): Promise<TokenDto> {
    const user = { userIdx: 1 }; //TODO 이메일을 이용해서 몽고디비에서 알맞는 회원정보 가져오기
    const savedPassword = '123';
    await bcrypt.compare(reqDto.userPassword, savedPassword);

    return await this.authService.generateTokens(user.userIdx);
  }
}
