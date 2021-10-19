import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/users/users';
import { UsersService } from 'src/users/users.service';
import { TwoFactorAuthenticationController } from './two-factor-authentication.controller';
import { TwoFactorAuthenticationService } from './two-factor-authentication.service';

@Module({
  imports: [
    ConfigService,
    TypeOrmModule.forFeature([Users]),
    JwtModule.register({
      secret: 'My random secret key never let others',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [TwoFactorAuthenticationService, UsersService],
  controllers: [TwoFactorAuthenticationController],
})
export class TwoFactorAuthenticationModule {}
