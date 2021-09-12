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
import { Server } from "http";
import { MessageService } from "./message.service";

@WebSocketGateway(4000, { namespace: "message", cors: true })
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
    client.emit("all-messages-to-client", messages);
  }

  public async handleDisconnect(client: any) {
    this.count -= 1;
    this.logger.log(`Disconnected: ${this.count} connections`);
  }

  public async afterInit(server: any) {
    this.logger.log("MessageGateway Initialized");
  }

  @SubscribeMessage("new-message-to-server")
  public async handleNewMessage(
    @MessageBody() data: { sender: string; message: string },
  ): Promise<void> {
    const message = await this.messageService.createMessage(
      data.sender,
      data.message,
    );
    this.wss.emit("new-message-to-client", { message });
  }
}
