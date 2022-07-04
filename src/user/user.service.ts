import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { TokenDto } from 'src/auth/dto/token.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';
import { SignUpReqeustDto } from './dto/sign-up.request.dto';
import { SignInReqeustDto } from './dto/sign-in.request.dto';

@Injectable()
export class UserService {
  constructor(
    private authService: AuthService,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>
  ) {}

  async signUpUser(reqDto: SignUpReqeustDto): Promise<User> {
    // 요청한 회원가입용 데이터 몽고디비에 저장
    const createdUser = new this.userModel(reqDto);
    return createdUser.save();
  }

  async signInUser(reqDto: SignInReqeustDto): Promise<TokenDto> {
    const user = { userIdx: 1 }; //TODO 이메일을 이용해서 몽고디비에서 알맞는 회원정보 가져오기
    const { userEmail, userPassword } = reqDto;
    const userData = await this.userModel.find({ userEmail: userEmail, userPassword: userPassword });

    if (userData) return await this.authService.generateTokens(user.userIdx);
    else throw new Error('User not found');
  }
}
