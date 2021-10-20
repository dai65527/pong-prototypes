import {
  Body,
  ConsoleLogger,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { TwoFactorAuthenticationService } from './two-factor-authentication.service';
import { Response } from 'express';
import { toFileStream } from 'qrcode';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';
import { RequestWithUser } from 'src/type/requestWithUser';
import { ConfigService } from '@nestjs/config';

@Controller('2fa')
export class TwoFactorAuthenticationController {
  constructor(
    private readonly twoFactorAuthenticationService: TwoFactorAuthenticationService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  getHello(): string {
    return 'Hello World!';
  }

  @Post('generate')
  @UseGuards(AuthGuard('jwt'))
  async register(@Req() request, @Res() response) {
    const { otpauthUrl } =
      await this.twoFactorAuthenticationService.generateTwoFactorAuthenticationSecret(
        request.user,
      );
    response.setHeader('content-type', 'image/png');
    return this.twoFactorAuthenticationService.pipeQrCodeStream(
      response,
      otpauthUrl,
    );
  }

  @Post('turn-on')
  @UseGuards(AuthGuard('jwt'))
  async turnOnTwoFactorAuthentication(
    @Req() req: RequestWithUser,
    @Body() request,
  ) {
    console.log(request);
    const isCodeValid =
      await this.twoFactorAuthenticationService.isTwoFactorAuthenticationCodeValid(
        request.twoFactorAuthenticationCode,
        req.user.userId,
      );
    console.log(req.user);
    console.log('isCodeValid', isCodeValid);
    if (!isCodeValid) {
      throw new UnauthorizedException('Wrong authentication code');
    }
    await this.usersService.turnOnTwoFactorAuthentication(request.userId);
  }

  @Post('authenticate')
  @UseGuards(AuthGuard('jwt'))
  async authenticate(
    @Req() request: RequestWithUser,
    @Body() { twoFactorAuthenticationCode },
    @Res({ passthrough: true }) res: Response,
  ): Promise<any> {
    const isCodeValid =
      await this.twoFactorAuthenticationService.isTwoFactorAuthenticationCodeValid(
        twoFactorAuthenticationCode,
        request.user.userId,
      );
    console.log('isCodeValid', isCodeValid);
    if (!isCodeValid) {
      throw new UnauthorizedException('Wrong authentication code');
    }

    const accessTokenCookie =
      await this.twoFactorAuthenticationService.getCookieWithJwtAccessToken(
        request.user.userId,
        true,
      );

    console.log('accessTokenCookie', accessTokenCookie);
    // res.cookie('auth-cookie', accessTokenCookie, {
    //   httpOnly: true,
    // });
    res.cookie('auth-cookie', accessTokenCookie, {
      httpOnly: true,
      maxAge: await this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
    });
    // res.setHeader('Set-Cookie', [accessTokenCookie]);
    return { msg: 'success' };
    // return request.user;
  }
}
