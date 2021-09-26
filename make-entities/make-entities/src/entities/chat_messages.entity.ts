import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  Check,
  Index,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { IsDate, IsEmail, Min } from "class-validator";
import { Users } from "./users.entity";
import { Chats } from "./chats.entity";
import { Chatmember } from "./chatmember.entity";

@Entity()
export class ChatMessages {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Chats, (chat) => chat.chat_messages, {
    nullable: false,
  })
  @JoinColumn({ name: "chat_id" })
  @Index()
  chat: Chats;

  @ManyToOne(() => Users, (user) => user.chat_messages, {
    nullable: false,
  })
  @JoinColumn({ name: "user_id" })
  @Index()
  user: Users;

  @Column({ type: "text" })
  message: string;

  @CreateDateColumn({ type: "timestamp with time zone" })
  @IsDate()
  created_at: Date;

  @OneToMany(() => Chatmember, (chatmember) => chatmember.last_checked_message)
  chatmember_chat_id: Chatmember[];
}
