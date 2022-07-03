import { PickType } from '@nestjs/swagger';
import { SignInReqeustDto } from './sign-in.request.dto';

export class SignUpReqeustDto extends PickType(SignInReqeustDto, ['userEmail', 'userPassword']) {}
