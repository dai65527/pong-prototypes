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
import { DirectMessages } from "./direct_messages.entity";
import { Users } from "./users.entity";

@Entity()
export class DirectMessageInfo {
  @PrimaryColumn()
  @ManyToOne(() => Users, (user) => user.directMessage_from, {
    nullable: false,
  })
  @JoinColumn({ name: "user_from_id" })
  @Index()
  user_from_id: number;

  @PrimaryColumn()
  @ManyToOne(() => Users, (user) => user.directMessage_to, { nullable: false })
  @JoinColumn({ name: "user_to_id" })
  @Index()
  user_to_id: number;

  @Column({ default: false })
  block: boolean;

  @ManyToOne(
    () => DirectMessages,
    (directMessages) => directMessages.directMessageInfo
  )
  @JoinColumn({ name: "last_checked_message_id" })
  last_checked_message_id: number;

  @CreateDateColumn({ type: "timestamp with time zone" })
  @IsDate()
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp with time zone" })
  @IsDate()
  updated_at: Date;
}
