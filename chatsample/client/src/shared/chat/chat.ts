// Shared types and interfaces of chat websocket interaction

// ChatEvent is WebSocket events for chat
export type ChatEvent =
  | "all-message-to-client"
  | "new-message-to-server"
  | "new-message-to-server";
export const ALL_MESSAGE_TO_CLIENT = "all-message-to-client";
export const NEW_MESSAGE_TO_CLIENT = "new-message-to-client";
export const NEW_MESSAGE_TO_SERVER = "new-message-to-server";

export interface IMessage {
  id?: number;
  sender: string;
  message: string;
  date?: Date;
}

export type AllMessageToClientPayload = {
  messages: IMessage[];
};

export type NewMessageToClientPayload = {
  message: IMessage;
};

export type NewMessageToServerPayload = {
  message: IMessage;
};
