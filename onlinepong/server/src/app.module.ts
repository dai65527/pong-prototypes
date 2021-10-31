import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { GameGateway } from './game/game.gateway';
import { TimeGateway } from './time/time.gateway';
import { TimeService } from './time/time.service';
import { GameService } from './game/game.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [],
  providers: [GameGateway, TimeGateway, TimeService, GameService],
})
export class AppModule {}
