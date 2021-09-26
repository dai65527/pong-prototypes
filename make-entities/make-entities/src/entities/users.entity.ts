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
import { Games } from "./games.entity";

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

  @CreateDateColumn({ type: "timestamp with time zone" })
  @IsDate()
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp with time zone" })
  @IsDate()
  updated_at: Date;

  @OneToMany(() => Friends, (friend) => friend.user_from_id)
  friends_user_from: Friends[];

  @OneToMany(() => Friends, (friend) => friend.user_to_id)
  friends_user_to: Friends[];

  @OneToMany(() => Invites, (invite) => invite.user_from_id)
  invites_user_from: Invites[];

  @OneToMany(() => Invites, (invite) => invite.user_to_id)
  invites_user_to: Invites[];

  @OneToMany(() => DirectMessages, (directMessage) => directMessage.user_from)
  directMessages_user_from: DirectMessages[];

  @OneToMany(() => DirectMessages, (directMessage) => directMessage.user_to)
  directMessages_user_to: DirectMessages[];

  @OneToMany(
    () => DirectMessageInfo,
    (directMessageInfo) => directMessageInfo.user_from_id
  )
  direct_message_infos_user_from: DirectMessageInfo[];

  @OneToMany(
    () => DirectMessageInfo,
    (directMessageInfo) => directMessageInfo.user_to_id
  )
  direct_message_infos_user_to: DirectMessageInfo[];

  @OneToMany(() => Chats, (chats) => chats.owner)
  chats_owner: Chats[];

  @OneToMany(() => Chats, (chats) => chats.admin)
  chats_admin: Chats[];

  @OneToMany(() => ChatMessages, (chatMessages) => chatMessages.user)
  chat_messages: ChatMessages[];

  @OneToMany(() => Chatmember, (chatmember) => chatmember.user_id)
  chatmembers_user: Chatmember[];

  @OneToMany(() => Games, (game) => game.user_first)
  games_user_first: Games[];

  @OneToMany(() => Games, (game) => game.user_second)
  games_user_second: Games[];
}
