import { PickType } from '@nestjs/swagger';
import { SignUpReqeustDto } from './sign-up.request.dto';

export class CheckEmailDto extends PickType(SignUpReqeustDto, ['userEmail']) {}
