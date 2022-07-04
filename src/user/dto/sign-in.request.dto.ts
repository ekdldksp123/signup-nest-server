import { PickType } from '@nestjs/swagger';
import { SignUpReqeustDto } from './sign-up.request.dto';

export class SignInReqeustDto extends PickType(SignUpReqeustDto, ['userEmail', 'userPassword']) {}
