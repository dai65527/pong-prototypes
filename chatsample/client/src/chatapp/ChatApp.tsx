import React from "react";
import { ChatData } from "../module/chat/ChatModel";
import ChatService, {
  chatReducer,
  ChatSocketioService,
} from "../module/chat/ChatService";
import DashBoard from "./DashBoard";

export const chatDataContext = React.createContext<ChatData>(undefined!);
export const chatServiceContext = React.createContext<ChatService>(undefined!);

let chatService: ChatService

const ChatApp: React.FC = () => {
  const [chatData, dispatch] = React.useReducer(chatReducer, {
    chats: [],
  });

  if (!chatService) {
    // chatService = new ChatMockService(dispatch);
    chatService = new ChatSocketioService(dispatch);
  } else {
    chatService.dispatch = dispatch;
  }

  return (
    <chatServiceContext.Provider value={chatService}>
      <chatDataContext.Provider value={chatData}>
        <DashBoard />
      </chatDataContext.Provider>
    </chatServiceContext.Provider>
  );
};
export default ChatApp;
