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

@Entity()
export class ChatMessages {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Chats, (chat) => chat.chat_messages_chat_id, {
    nullable: false,
  })
  @JoinColumn({ name: "chat_id" })
  @Index()
  chat_id: Chats;

  @ManyToOne(() => Users, (user) => user.chat_messages_user_id, {
    nullable: false,
  })
  @JoinColumn({ name: "user_id" })
  @Index()
  user_id: Users;

  @Column({ type: "text" })
  message: string;

  @CreateDateColumn()
  @IsDate()
  created_at: Date;
}
