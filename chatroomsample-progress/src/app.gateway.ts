import { Logger } from "@nestjs/common";
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway({ path: "/websockets" })
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger: Logger = new Logger("AppGateway");

  @WebSocketServer() wss: Server;

  afterInit(server: any) {
    this.logger.log("initialized");
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage("msgToServer")
  handleMessage(client: Socket, text: string): void {
    this.wss.emit("msgToClient", text); // to all client
    // return { event: "msgToClient", data: text }; // just to sender
  }
}
