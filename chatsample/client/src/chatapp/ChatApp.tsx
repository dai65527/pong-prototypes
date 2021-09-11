import React from "react";
import { ChatData } from "../module/chat/ChatModel";
import ChatService, {
  ChatMockService,
  chatReducer,
} from "../module/chat/ChatService";
import DashBoard from "./DashBoard";

export const chatDataContext = React.createContext<ChatData>(undefined!);
export const chatServiceContext = React.createContext<ChatService>(undefined!);

const ChatApp: React.FC = () => {
  const [chatData, dispatch] = React.useReducer(chatReducer, {
    chats: [{ from: "dnakano", msg: "hoge" }],
  });
  const chatService = new ChatMockService(dispatch);

  return (
    <chatServiceContext.Provider value={chatService}>
      <chatDataContext.Provider value={chatData}>
        <DashBoard />
      </chatDataContext.Provider>
    </chatServiceContext.Provider>
  );
};
export default ChatApp;
