import { IMessage } from "../../shared/chat/chat";

export class Message implements IMessage {
  constructor(
    readonly sender: string,
    readonly message: string,
    readonly Date?: Date,
    readonly id?: number,
  ) {}
}

export class ChatData {
  constructor(
    readonly messages: Message[],
  ) {}
};
