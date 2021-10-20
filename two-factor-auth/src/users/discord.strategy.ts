import { PassportStrategy } from '@nestjs/passport';
import { HttpService, Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-oauth2';
import { stringify } from 'querystring';
import { CurrentUser } from 'src/models/current.user';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, 'discord') {
  constructor(private http: HttpService, private userService: UsersService) {
    super({
      authorizationURL: `https://discordapp.com/api/oauth2/authorize?${stringify(
        {
          client_id: '896202826550767627',
          redirect_uri: 'http://localhost:3000/users/auth/discord',
          response_type: 'code',
          scope: 'identify',
        },
      )}`,
      tokenURL: 'https://discordapp.com/api/oauth2/token',
      clientID: '896202826550767627',
      clientSecret: 'uikqmdsAvImUXFpzDptojZJUb9fl_zNv',
      callbackURL: 'http://localhost:3000/users/auth/discord',
      scope: 'identify',
    });
  }

  async validate(accessToken: string): Promise<CurrentUser> {
    const { data } = await this.http
      .get('https://discordapp.com/api/users/@me', {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .toPromise();
    console.log(data);
    const user = await this.userService.validateUserCredentialsByDiscode(
      data.id,
    );

    if (user == null) {
      throw new UnauthorizedException();
    }
    return user;
    // return data.id;
  }
}
