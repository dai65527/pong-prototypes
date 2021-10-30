import { Logger } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway(4000, { namespace: 'time', cors: true })
export class TimeGateway {
  @WebSocketServer() wss: Server;

  private logger: Logger = new Logger('TimeGateway');

  afterInit(server: any) {
    this.logger.log('initialized');
  }

  sendTimeToAll(time: number) {
    this.wss.emit('msgToClient', {
      message: 'unixtime',
      unixTimeMili: time,
    });
  }
}
