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
import { ChatMessages } from "./chat_messages.entity";
import { Chatmember } from "./chatmember.entity";

@Entity()
export class Chats {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  name: string;

  @ManyToOne(() => Users, (user) => user.chats_owner_id, { nullable: false })
  @JoinColumn({ name: "owner_id" })
  @Index()
  owner_id: Users;

  @ManyToOne(() => Users, (user) => user.chats_admin_id)
  @JoinColumn({ name: "admin_id" })
  @Index()
  admin_id: Users;

  @Column({ type: "text" })
  password_digest: string;

  @CreateDateColumn({ type: "timestamp with time zone" })
  @IsDate()
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp with time zone" })
  @IsDate()
  updated_at: Date;

  @OneToMany(() => ChatMessages, (chatMessages) => chatMessages.chat_id)
  chat_messages_chat_id: ChatMessages[];

  @OneToMany(() => Chatmember, (chatmember) => chatmember.chat_id)
  chatmember_chat_id: Chatmember[];
}
