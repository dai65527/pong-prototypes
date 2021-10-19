import {
  ConsoleLogger,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from './users.service';

@Injectable()
export class JwtTwoFactorStrategy extends PassportStrategy(
  Strategy,
  'jwt-two-factor',
) {
  constructor(private readonly userService: UsersService) {
    super({
      ignoreExpiration: false,
      secretOrKey: 'My random secret key never let others',
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const data = request?.cookies['auth-cookie'];
          console.log('data', data);
          if (!data) {
            return null;
          }
          // return data;
          return data.token;
        },
      ]),
    });
  }

  async validate(payload: any) {
    console.log('payload', payload);
    if (payload === null) {
      throw new UnauthorizedException();
    }
    const isTwoFactorAuthenticationEnabled: boolean =
      await this.userService.isTwoFactorAuthenticationEnabled(payload.userId);
    if (isTwoFactorAuthenticationEnabled) {
      if (payload.isSecondFactorAuthenticated) {
        return payload;
      } else {
        throw new UnauthorizedException();
      }
    } else {
      return payload;
    }
  }
}
