import { Inject, Logger } from "@nestjs/common";
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import {
  AllMessageToClientPayload,
  NewMessageToClientPayload,
  ALL_MESSAGE_TO_CLIENT,
  NEW_MESSAGE_TO_CLIENT,
  NEW_MESSAGE_TO_SERVER,
  NewMessageToServerPayload,
} from "@shared/chat/chat";
import { Server } from "http";
import { MessageService } from "./message.service";

@WebSocketGateway(parseInt(`${process.env.WEBSOCKET_PORT}`), {
  namespace: "message",
  cors: true,
})
export class MessageGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @Inject()
  private messageService: MessageService;

  @WebSocketServer()
  private wss: Server;

  private logger = new Logger("MessageGateway");
  private count = 0;

  public async handleConnection(client: any, ...args: any[]) {
    this.count += 1;
    this.logger.log(`Connected: ${this.count} connections`);
    const messages = await this.messageService.getAll();
    const payload: AllMessageToClientPayload = {
      messages: messages,
    };
    client.emit(ALL_MESSAGE_TO_CLIENT, payload);
  }

  public async handleDisconnect(client: any) {
    this.count -= 1;
    this.logger.log(`Disconnected: ${this.count} connections`);
  }

  public async afterInit(server: any) {
    this.logger.log("MessageGateway Initialized");
  }

  @SubscribeMessage(NEW_MESSAGE_TO_SERVER)
  public async handleNewMessage(
    @MessageBody() data: NewMessageToServerPayload,
  ): Promise<void> {
    const message = await this.messageService.createMessage(
      data.message.sender,
      data.message.message,
    );

    const payload: NewMessageToClientPayload = {
      message: message,
    };
    this.wss.emit(NEW_MESSAGE_TO_CLIENT, payload);
  }
}
