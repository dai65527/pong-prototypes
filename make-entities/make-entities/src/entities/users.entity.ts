import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  Check,
  Index,
} from "typeorm";
import { IsDate, IsEmail, Min } from "class-validator";
import { Invites } from "./Invites.entity";
import { DirectMessages } from "./direct_messages.entity";
import { DirectMessageInfo } from "./direct_message_info.entity";
import { Friends } from "./friends.entity";
import { Chats } from "./chats.entity";
import { ChatMessages } from "./chat_messages.entity";
import { Chatmember } from "./chatmember.entity";

@Entity()
@Check(`"rate" >= 0`)
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ type: "text", unique: true })
  name: string;

  @Index()
  @Column({ type: "text", unique: true })
  intra_id: string;

  @Column({ type: "text", nullable: true })
  @IsEmail()
  email: string;

  @Column({ default: 0 })
  @Min(0)
  rate: number;

  @Column()
  status: number;

  @Column({ type: "text" })
  onetimepass_digest: string;

  @Column({ type: "text" })
  remenber_digest: string;

  @Column({ type: "text", nullable: true })
  avatar: string;

  @CreateDateColumn()
  @IsDate()
  created_at: Date;

  @UpdateDateColumn()
  @IsDate()
  updated_at: Date;

  @OneToMany(() => Friends, (friend) => friend.user_from_id)
  friends_from: Friends[];

  @OneToMany(() => Friends, (friend) => friend.user_to_id)
  friends_to: Friends[];

  @OneToMany(() => Invites, (invite) => invite.user_from_id)
  invites_from: Invites[];

  @OneToMany(() => Invites, (invite) => invite.user_to_id)
  invites_to: Invites[];

  @OneToMany(
    () => DirectMessages,
    (directMessage) => directMessage.user_from_id
  )
  directMessage_from: DirectMessages[];

  @OneToMany(() => DirectMessages, (directMessage) => directMessage.user_to_id)
  directMessage_to: DirectMessages[];

  @OneToMany(
    () => DirectMessageInfo,
    (directMessageInfo) => directMessageInfo.user_from_id
  )
  direct_message_info_user_from_id: DirectMessageInfo[];

  @OneToMany(
    () => DirectMessageInfo,
    (directMessageInfo) => directMessageInfo.user_to_id
  )
  user_to_id: DirectMessageInfo[];

  @OneToMany(() => Chats, (chats) => chats.user_from_id)
  chats_user_from_id: Chats[];

  @OneToMany(() => Chats, (chats) => chats.user_to_id)
  chats_user_to_id: Chats[];

  @OneToMany(() => ChatMessages, (chatMessages) => chatMessages.user_id)
  chat_messages_user_id: Chats[];

  @OneToMany(() => Chatmember, (chatmember) => chatmember.user_id)
  chatmember_user_id: Chatmember[];
}
