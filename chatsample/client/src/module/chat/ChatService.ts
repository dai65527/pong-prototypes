import React from "react";
import { Chat, ChatData } from "./ChatModel";

export default interface ChatService {
  sendNewMessage(chat: Chat): void;
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
      return { chats: [...state.chats, ...action.data] };
    default:
      return state;
  }
};

export class ChatMockService implements ChatService {
  constructor(private dispatch: React.Dispatch<ChatReducerAction>) {}

  public sendNewMessage(chat: Chat): void {
    this.dispatch({
      type: "NEW_MESSAGE",
      data: [chat],
    });
  }
}
