import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { IsDate } from "class-validator";
import { Users } from "./users.entity";
import { ChatMessages } from "./chat_messages.entity";
import { Chatmember } from "./chatmember.entity";

@Entity()
export class Chats {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  name: string;

  @ManyToOne(() => Users, (user) => user.chats_owner, { nullable: false })
  @JoinColumn({ name: "owner_id" })
  @Index()
  owner: Users;

  @ManyToOne(() => Users, (user) => user.chats_admin)
  @JoinColumn({ name: "admin_id" })
  @Index()
  admin: Users;

  @Column({ type: "text" })
  password_digest: string;

  @CreateDateColumn({ type: "timestamp with time zone" })
  @IsDate()
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp with time zone" })
  @IsDate()
  updated_at: Date;

  @OneToMany(() => ChatMessages, (chatMessages) => chatMessages.chat)
  chat_messages: ChatMessages[];

  @OneToMany(() => Chatmember, (chatmember) => chatmember.chat_id)
  chatmembers: Chatmember[];
}
