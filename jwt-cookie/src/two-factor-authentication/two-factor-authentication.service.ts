import { ConsoleLogger, Injectable } from '@nestjs/common';
import { authenticator } from 'otplib';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { Users } from 'src/users/users';
import { toFileStream } from 'qrcode';
import { Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TwoFactorAuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    @InjectRepository(Users) private users: Repository<Users>,
    private readonly jwtService: JwtService,
  ) {}
  async generateTwoFactorAuthenticationSecret(user: Users) {
    const secret = authenticator.generateSecret();
    const otpauthUrl = authenticator.keyuri(
      user.email,
      this.configService.get('TWO_FACTOR_AUTHENTICATION_APP_NAME'),
      secret,
    );
    await this.usersService.setTwoFactorAuthenticationSecret(
      secret,
      user.userId,
    );
    return {
      secret,
      otpauthUrl,
    };
  }

  async pipeQrCodeStream(stream: Response, otpauthUrl: string) {
    return await toFileStream(stream, otpauthUrl);
  }

  async isTwoFactorAuthenticationCodeValid(
    twoFactorAuthenticationCode: string,
    id: number,
  ) {
    const user = await this.users.findOne({ userId: id });
    if (user == null) {
      return null;
    }
    return authenticator.verify({
      token: twoFactorAuthenticationCode,
      secret: user.two_factor_authentication,
    });
  }

  async getTwoFactorJwtAccessToken(
    userId: number,
    isSecondFactorAuthenticated = false,
  ) {
    const payload = { userId, isSecondFactorAuthenticated };
    return this.jwtService.sign(payload, {
      secret: await this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${await this.configService.get(
        'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
      )}s`,
    });
  }

  async getCookieWithJwtAccessToken(
    userId: number,
    isSecondFactorAuthenticated = false,
  ) {
    const token = await this.getTwoFactorJwtAccessToken(
      userId,
      isSecondFactorAuthenticated,
    );
    const refreshToken = await this.usersService.getRefreshToken(userId);
    const secretData = {
      token,
      refreshToken,
    };

    console.log('token', token);
    console.log('secretData', secretData);
    return secretData;
  }
}
