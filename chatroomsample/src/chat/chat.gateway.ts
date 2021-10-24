import { Logger } from "@nestjs/common";
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway({ namespace: "/chat" })
export class ChatGateway {
  @WebSocketServer() wss: Server;

  private logger: Logger = new Logger("ChatGateway");

  afterInit(server: any) {
    this.logger.log("Initialized");
  }

  @SubscribeMessage("chatToServer")
  handleMessage(
    client: Socket,
    message: { sender: string; room: string; message: string },
  ): void {
    console.log(message);
    // this.wss.emit("chatToClient", message); // no room
    this.wss.to(message.room).emit("chatToClient", message); // to room
  }

  @SubscribeMessage("joinRoom")
  handleJoinRoom(client: Socket, room: string) {
    client.join(room);
    client.emit("joinedRoom", room);
  }

  @SubscribeMessage("leaveRoom")
  handleLeaveRoom(client: Socket, room: string) {
    client.leave(room);
    client.emit("leftRoom", room);
  }
}
