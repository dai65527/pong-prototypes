import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { Users } from './users/users';
import { ConfigModule } from '@nestjs/config';
import { TwoFactorAuthenticationService } from './two-factor-authentication/two-factor-authentication.service';
import { TwoFactorAuthenticationController } from './two-factor-authentication/two-factor-authentication.controller';
import { TwoFactorAuthenticationModule } from './two-factor-authentication/two-factor-authentication.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'learmoreseekmore',
      entities: [Users],
      logging: 'all',
    }),
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TwoFactorAuthenticationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
