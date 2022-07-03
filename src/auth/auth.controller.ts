import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AccessGuard } from './guards/access.guards';
import { RefreshTokenCertificateRequestDto } from './dto/refresh-token-certificate-request.dto';
import { AuthService } from './auth.service';
import { RefreshGuard } from './guards/refresh.guards';

@ApiTags('인증')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: '[테스트]리프레시 토큰 검증' })
  @Post('test/certificate-refresh-token')
  @UseGuards(RefreshGuard)
  async certificateRefreshToken(@Body() reqDto: RefreshTokenCertificateRequestDto): Promise<string> {
    return 'ok';
  }

  @ApiOperation({ summary: '[테스트]어세스 토큰 검증' })
  @ApiBearerAuth('access-token')
  @UseGuards(AccessGuard)
  @Get('test/certificate-access-token')
  async certificateAccessToken(): Promise<string> {
    return 'ok';
  }
}
