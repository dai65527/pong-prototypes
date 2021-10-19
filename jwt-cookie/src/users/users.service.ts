import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegistrationReqModel } from 'src/models/registration.req.model';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { Users } from './users';
import * as bcrypt from 'bcrypt';
import { RegistrationRespModel } from 'src/models/registration.resp.model';
import { CurrentUser } from 'src/models/current.user';
import { JwtService } from '@nestjs/jwt';
import * as randomToken from 'rand-token';
import * as moment from 'moment';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private users: Repository<Users>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  private async registrationValidation(
    regModel: RegistrationReqModel,
  ): Promise<string> {
    if (!regModel.email) {
      return "Email can't be empty";
    }

    const emailRule =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!emailRule.test(regModel.email.toLowerCase())) {
      return 'Invalid email';
    }

    const user = await this.users.findOne({ email: regModel.email });
    if (user != null && user.email) {
      return 'Email already exist';
    }

    if (regModel.password !== regModel.confirmPassword) {
      return 'Confirm password not matching';
    }
    return '';
  }

  private async getPasswordHash(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  public async registerUser(
    regModel: RegistrationReqModel,
  ): Promise<RegistrationRespModel> {
    const result = new RegistrationRespModel();

    const errorMessage = await this.registrationValidation(regModel);
    if (errorMessage) {
      result.message = errorMessage;
      result.successStatus = false;

      return result;
    }

    const newUser = new Users();
    newUser.firstName = regModel.firstName;
    newUser.lastName = regModel.lastName;
    newUser.email = regModel.email;
    newUser.password = await this.getPasswordHash(regModel.password);

    await this.users.insert(newUser);
    result.successStatus = true;
    result.message = 'success';
    return result;
  }

  public async validateUserCredentials(
    email: string,
    password: string,
  ): Promise<CurrentUser> {
    const user = await this.users.findOne({ email: email });

    if (user == null) {
      return null;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return null;
    }

    const currentUser = new CurrentUser();
    currentUser.userId = user.userId;
    currentUser.firstName = user.firstName;
    currentUser.lastName = user.lastName;
    currentUser.email = user.email;
    currentUser.discodeid = user.discodeid;

    return currentUser;
  }

  public async validateUserCredentialsByDiscode(
    id: string,
  ): Promise<CurrentUser> {
    const user = await this.users.findOne({ discodeid: id });

    if (user == null) {
      return null;
    }

    const currentUser = new CurrentUser();
    currentUser.userId = user.userId;
    currentUser.firstName = user.firstName;
    currentUser.lastName = user.lastName;
    currentUser.email = user.email;
    currentUser.discodeid = user.discodeid;

    return currentUser;
  }

  public async getJwtToken(user: CurrentUser): Promise<string> {
    const payload = {
      ...user,
    };
    // console.log(payload);
    return this.jwtService.signAsync(payload);
  }

  public async getRefreshToken(userId: number): Promise<string> {
    const userDataToUpdate = {
      refreshToken: randomToken.generate(16),
      refreshTokenExp: moment().add(1, 'days').format('YYYY/MM/DD'),
    };
    console.log('refreshTokenExp', userDataToUpdate.refreshTokenExp);
    await this.users.update(userId, userDataToUpdate);
    return userDataToUpdate.refreshToken;
  }

  public async validRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<CurrentUser> {
    const currentDate = moment().day(1).format('YYYY/MM/DD');
    const user = await this.users.findOne({
      where: {
        userId: userId,
        refreshToken: refreshToken,
        refreshTokenExp: MoreThanOrEqual(currentDate),
      },
    });

    if (!user) {
      return null;
    }

    const currentUser = new CurrentUser();
    currentUser.userId = user.userId;
    currentUser.firstName = user.firstName;
    currentUser.lastName = user.lastName;
    currentUser.email = user.email;
    currentUser.isSecondFactorAuthenticated =
      user.is_two_factor_authentication_enabled;
    return currentUser;
  }

  public async validateUserCredentialsBy42(id: string): Promise<CurrentUser> {
    let user = await this.users.findOne({ intra_id: id });

    if (user == null) {
      const newUser = new Users();
      newUser.intra_id = id;
      newUser.email = id + '@student.42tokyo.jp';
      await this.users.insert(newUser);
      user = await this.users.findOne({ intra_id: id });
    }

    const currentUser = new CurrentUser();
    currentUser.userId = user.userId;
    currentUser.firstName = user.firstName;
    currentUser.lastName = user.lastName;
    currentUser.email = user.email;
    currentUser.intra_id = user.intra_id;

    return currentUser;
  }

  public showEnv(): void {
    console.log(this.configService.get<string>('TEST'));
    console.log(process.env.TEST);
    const logger: Logger = new Logger('users.service.ts');
    logger.log(`Server started on port ${process.env.SERVER_PORT}`);

    const nodemailer = require('nodemailer');

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: process.env.MAIL_SECURE,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      secureConnection: false,
      tls: {
        ciphers: 'SSLv3',
      },
    });

    const data = {
      from: 'erogamescape@gmail.com',
      to: 't1@ap2.sakura.ne.jp',
      text: 'テキストメール本文\nテキストメール本文\nテキストメール本文',
      subject: 'メール件名',
    };

    transporter.sendMail(data, (error, info) => {
      if (error) {
        console.log(error); // エラー情報
      } else {
        console.log(info); // 送信したメールの情報
      }
    });
  }

  async setTwoFactorAuthenticationSecret(
    secret: string,
    id: number,
  ): Promise<any> {
    return this.users.update(
      { userId: id },
      {
        two_factor_authentication: secret,
      },
    );
  }

  async turnOnTwoFactorAuthentication(id: number): Promise<any> {
    return this.users.update(
      { userId: id },
      {
        is_two_factor_authentication_enabled: true,
      },
    );
  }

  async isTwoFactorAuthenticationEnabled(user_id: number): Promise<boolean> {
    const user = await this.users.findOne({ userId: user_id });

    if (user == null) {
      return null;
    }
    return user.is_two_factor_authentication_enabled;
  }
}
