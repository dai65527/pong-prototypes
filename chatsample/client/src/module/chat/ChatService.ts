import React from "react";
import { io, Socket } from "socket.io-client";
import { Chat, ChatData, ChatServerData } from "./ChatModel";

export default interface ChatService {
  sendNewMessage(chat: Chat): void;
  set dispatch(dispatch: React.Dispatch<ChatReducerAction>);
}

type ChatReducerActionType = "NEW_MESSAGE";

type ChatReducerAction = {
  type: ChatReducerActionType;
  data: Chat[];
};

export const chatReducer = (
  state: ChatData,
  action: ChatReducerAction
): ChatData => {
  switch (action.type) {
    case "NEW_MESSAGE":
      console.log(action.data)
      const ret = { chats: [...state.chats, ...action.data] };
      console.log(ret)
      return ret
    default:
      return state;
  }
};

export class ChatSocketioService implements ChatService {
  private dispatch_: React.Dispatch<ChatReducerAction>;
  private socket_: Socket;

  constructor(dispatch: React.Dispatch<ChatReducerAction>) {
    this.dispatch_ = dispatch;
    this.socket_ = io(":4000/message");
    console.log("socket constructor called");

    this.socket_.on("all-messages-to-client", (data: ChatServerData[]) => {
      this.dispatch_({
        type: "NEW_MESSAGE",
        data: data,
      });
    });

    this.socket_.on("new-message-to-client", (data: {message: ChatServerData}) => {
      console.log(data.message);
      this.dispatch_({
        type: "NEW_MESSAGE",
        data: [data.message],
      });
    });
  }

  public sendNewMessage(chat: Chat): void {
    this.socket_.emit("new-message-to-server", chat);
  }

  set dispatch(dispatch: React.Dispatch<ChatReducerAction>) {
    this.dispatch_ = dispatch;
  }
}

export class ChatMockService implements ChatService {
  private dispatch_: React.Dispatch<ChatReducerAction>;

  constructor(dispatch: React.Dispatch<ChatReducerAction>) {
    this.dispatch_ = dispatch;
    console.log("constructor called");
  }

  public sendNewMessage(chat: Chat): void {
    this.dispatch_({
      type: "NEW_MESSAGE",
      data: [chat],
    });
  }

  set dispatch(dispatch: React.Dispatch<ChatReducerAction>) {
    this.dispatch_ = dispatch;
  }
}
