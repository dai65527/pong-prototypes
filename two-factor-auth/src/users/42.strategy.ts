import { PassportStrategy } from '@nestjs/passport';
import { HttpService, Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-oauth2';
import { stringify } from 'querystring';
import { CurrentUser } from 'src/models/current.user';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class FortyTwoStrategy extends PassportStrategy(Strategy, '42') {
  constructor(private http: HttpService, private userService: UsersService) {
    super({
      authorizationURL: `https://api.intra.42.fr/oauth/authorize?${stringify({
        client_id:
          '5b5b1d2cf8f25a6683209b038d735455c5779532e2323cba162ad71f95bb5dc3',
        redirect_uri: 'http://localhost:3000/users/auth/42',
        response_type: 'code',
        scope: 'public',
      })}`,
      tokenURL: 'https://api.intra.42.fr/oauth/token',
      clientID:
        '5b5b1d2cf8f25a6683209b038d735455c5779532e2323cba162ad71f95bb5dc3',
      clientSecret:
        '7e967d481ebf53549583232e1f5cd81f3b5850bef11ca1de203c092fcba56dc4',
      callbackURL: 'http://localhost:3000/users/auth/42',
      scope: 'public',
    });
  }

  async validate(accessToken: string): Promise<CurrentUser> {
    const { data } = await this.http
      .get('https://api.intra.42.fr/v2/me', {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .toPromise();
    console.log("login", data.login);
    const user = await this.userService.validateUserCredentialsBy42(data.login);

    if (user == null) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
