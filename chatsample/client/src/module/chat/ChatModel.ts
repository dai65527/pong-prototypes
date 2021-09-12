export type Chat = {
  sender: string;
  message: string;
};

export type ChatData = {
  chats: Chat[];
}

export type ChatServerData = {
  id: number;
  date: Date;
} & Chat;
