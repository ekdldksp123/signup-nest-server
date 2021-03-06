import { JWT_TOKEN_TYPE } from '@common/enum/type.enum';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigShared } from '@shared/config.shared';
import { TokenDto } from './dto/token.dto';
@Injectable()
export class AuthService {
  constructor(private config: ConfigShared, private jwtService: JwtService) {}

  async generateAccessToken(): Promise<string> {
    return await this.jwtService.signAsync(
      {
        iat: Math.ceil(new Date().getTime() / 1000),
        tokenType: JWT_TOKEN_TYPE.ACCESS_TOKEN,
      },
      {
        issuer: this.config.JWT.JWT_ISS,
        secret: this.config.JWT.ACCESS_TOKEN_SECRET,
        expiresIn: this.config.JWT.ACCESS_TOKEN_EXPIRE_DATE,
      }
    );
  }

  async generateRefreshToken(): Promise<string> {
    return await this.jwtService.signAsync(
      {
        iat: Math.ceil(new Date().getTime() / 1000),
        tokenType: JWT_TOKEN_TYPE.REFRESH_TOKEN,
      },
      {
        issuer: this.config.JWT.JWT_ISS,
        secret: this.config.JWT.REFRESH_TOKEN_SECRET,
        expiresIn: this.config.JWT.REFRESH_TOKEN_EXPIRE_DATE,
      }
    );
  }

  async generateTokens(): Promise<TokenDto> {
    const [accessToken, refreshToken] = await Promise.all([this.generateAccessToken(), this.generateRefreshToken()]);
    return { accessToken, refreshToken };
  }
}
