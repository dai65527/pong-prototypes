import { IsDate } from "class-validator";
import {
  Entity,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
  PrimaryColumn,
  UpdateDateColumn,
  Index,
} from "typeorm";
import { Chats } from "./chats.entity";
import { ChatMessages } from "./chat_messages.entity";
import { Users } from "./users.entity";

@Entity()
export class Chatmember {
  @PrimaryColumn()
  @ManyToOne(() => Chats, (chat) => chat.chatmember_chat_id, {
    nullable: false,
  })
  @JoinColumn({ name: "chat_id" })
  @Index()
  chat_id: number;

  @PrimaryColumn()
  @ManyToOne(() => Users, (user) => user.chatmember_user_id, {
    nullable: false,
  })
  @JoinColumn({ name: "user_to_id" })
  @Index()
  user_id: number;

  @Column({ nullable: true })
  muted_until: Date;

  @Column({ nullable: true })
  banned_until: Date;

  @ManyToOne(
    () => ChatMessages,
    (chatMessage) => chatMessage.chatmember_chat_id
  )
  @JoinColumn({ name: "last_checked_message_id" })
  last_checked_message_id: number;

  @CreateDateColumn()
  @IsDate()
  created_at: Date;
}
