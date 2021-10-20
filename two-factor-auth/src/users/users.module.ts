import { HttpModule, HttpService, Module, Logger } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { RefreshStrategy } from './refresh.strategy';
import { DiscordStrategy } from './discord.strategy';
import { FortyTwoStrategy } from './42.strategy';
import { ConfigService } from '@nestjs/config';
import { JwtTwoFactorStrategy } from './jwt-two-factor.strategy';

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([Users]),
    JwtModule.register({
      secret: 'My random secret key never let others',
      signOptions: { expiresIn: '1h' },
    }),
    HttpModule,
    ConfigService,
  ],
  providers: [
    UsersService,
    LocalStrategy,
    JwtStrategy,
    RefreshStrategy,
    DiscordStrategy,
    FortyTwoStrategy,
    JwtTwoFactorStrategy,
  ],
  controllers: [UsersController],
})
export class UsersModule {}
