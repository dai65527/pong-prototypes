import React from "react";
import { ChatData } from "../module/chat/ChatModel";
import ChatService, {
  chatReducer,
  ChatSocketioService,
  // ChatMockService,
} from "../module/chat/ChatService";
import DashBoard from "./DashBoard";

export const chatDataContext = React.createContext<ChatData>(undefined!);
export const chatServiceContext = React.createContext<ChatService>(undefined!);

let chatService: ChatService

const ChatApp: React.FC = () => {
  const [chatData, dispatch] = React.useReducer(chatReducer, new ChatData([]));

  if (!chatService) {
    chatService = new ChatSocketioService(dispatch);
    // chatService = new ChatMockService(dispatch);
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
