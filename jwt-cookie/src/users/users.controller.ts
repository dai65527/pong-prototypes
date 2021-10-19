import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { CurrentUser } from 'src/models/current.user';
import { RegistrationReqModel } from 'src/models/registration.req.model';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  @Post('registration')
  async registerUser(@Body() reg: RegistrationReqModel) {
    return await this.userService.registerUser(reg);
  }

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Req() req, @Res({ passthrough: true }) res: Response) {
    const token = await this.userService.getJwtToken(req.user as CurrentUser);
    const refreshToken = await this.userService.getRefreshToken(
      req.user.userId,
    );

    const secretData = {
      token,
      refreshToken,
    };
    console.log(token);
    res.cookie('auth-cookie', secretData, { httpOnly: true });
    return { msg: 'success' };
  }

  @Get('fav-movies')
  @UseGuards(AuthGuard('jwt'))
  async movies(@Req() req) {
    console.log(req);
    return ['Avatar', 'Avengers'];
  }

  @Get('refresh-tokens')
  @UseGuards(AuthGuard('refresh'))
  async regenerateTokens(
    @Req() req,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log('req.user', req.user);
    const token = await this.userService.getJwtToken(req.user as CurrentUser);
    const refreshToken = await this.userService.getRefreshToken(
      req.user.userId,
    );
    const secretData = {
      token,
      refreshToken,
    };

    res.cookie('auth-cookie', secretData, { httpOnly: true });
    return { msg: 'success' };
  }

  @Get('auth/discord')
  @UseGuards(AuthGuard('discord'))
  async getUserFromDiscordLogin(
    @Req() req,
    @Res({ passthrough: true }) res: Response,
  ): Promise<any> {
    const token = await this.userService.getJwtToken(req.user as CurrentUser);
    const refreshToken = await this.userService.getRefreshToken(
      req.user.userId,
    );

    const secretData = {
      token,
      refreshToken,
    };
    console.log(token);
    res.cookie('auth-cookie', secretData, { httpOnly: true });
    return { msg: 'success' };
    // return req.user;
  }

  @Get('auth/42')
  @UseGuards(AuthGuard('42'))
  async getUserFrom42Login(
    @Req() req,
    @Res({ passthrough: true }) res: Response,
  ): Promise<any> {
    console.log('req.user', req.user);
    const token = await this.userService.getJwtToken(req.user as CurrentUser);
    const refreshToken = await this.userService.getRefreshToken(
      req.user.userId,
    );

    const secretData = {
      token,
      refreshToken,
    };
    console.log('token', token);
    console.log('refreshToken', refreshToken);
    res.cookie('auth-cookie', secretData, {
      httpOnly: true,
      maxAge: await this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
    });
    return { msg: 'success' };
    // return req.user;
  }

  @Get('env')
  showEnv() {
    this.userService.showEnv();
  }

  @Get('fav-games')
  @UseGuards(AuthGuard('jwt-two-factor'))
  async games(@Req() req) {
    console.log(req);
    return ['Dragonquest', 'Actraiser'];
  }
}
