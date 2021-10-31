import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { TimeGateway } from './time.gateway';

@Injectable()
export class TimeService {
  constructor(private timeGateway: TimeGateway) {}

  // private logger: Logger = new Logger('TimeService');

  @Interval(10)
  emitTimeSend() {
    // this.logger.log('cron');
    this.timeGateway.sendTimeToAll(Date.now());
  }
}
