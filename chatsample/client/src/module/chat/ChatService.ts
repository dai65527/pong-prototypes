import {
  AllMessageToClientPayload,
  ALL_MESSAGE_TO_CLIENT,
  NewMessageToClientPayload,
  NewMessageToServerPayload,
  NEW_MESSAGE_TO_CLIENT,
  NEW_MESSAGE_TO_SERVER,
} from "../../shared/chat/chat";
import React from "react";
import { io, Socket } from "socket.io-client";
import { ChatData, Message } from "./ChatModel";

export default interface ChatService {
  sendNewMessage(message: Message): void;
  set dispatch(dispatch: React.Dispatch<ChatReducerAction>);
}

type ChatReducerActionType = "NEW_MESSAGE";

type ChatReducerAction = {
  type: ChatReducerActionType;
  data: Message[];
};

export const chatReducer = (
  state: ChatData,
  action: ChatReducerAction
): ChatData => {
  switch (action.type) {
    case "NEW_MESSAGE":
      return new ChatData([...state.messages, ...action.data]);
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

    this.socket_.on(
      ALL_MESSAGE_TO_CLIENT,
      (payload: AllMessageToClientPayload) => {
        this.dispatch_({
          type: "NEW_MESSAGE",
          data: payload.messages,
        });
      }
    );

    this.socket_.on(
      NEW_MESSAGE_TO_CLIENT,
      (payload: NewMessageToClientPayload) => {
        this.dispatch_({
          type: "NEW_MESSAGE",
          data: [payload.message],
        });
      }
    );
  }

  public sendNewMessage(message: Message): void {
    const payload: NewMessageToServerPayload = {
      message: message,
    };
    this.socket_.emit(NEW_MESSAGE_TO_SERVER, payload);
  }

  set dispatch(dispatch: React.Dispatch<ChatReducerAction>) {
    this.dispatch_ = dispatch;
  }
}

export class ChatMockService implements ChatService {
  private dispatch_: React.Dispatch<ChatReducerAction>;

  constructor(dispatch: React.Dispatch<ChatReducerAction>) {
    this.dispatch_ = dispatch;
  }

  public sendNewMessage(message: Message): void {
    this.dispatch_({
      type: "NEW_MESSAGE",
      data: [message],
    });
  }

  set dispatch(dispatch: React.Dispatch<ChatReducerAction>) {
    this.dispatch_ = dispatch;
  }
}
