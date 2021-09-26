import { IsDate } from "class-validator";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
  OneToMany,
  Index,
} from "typeorm";
import { DirectMessageInfo } from "./direct_message_info.entity";
import { Users } from "./users.entity";

@Entity()
export class DirectMessages {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, (user) => user.directMessage_from, {
    nullable: false,
  })
  @JoinColumn({ name: "user_from_id" })
  @Index()
  user_from_id: Users;

  @ManyToOne(() => Users, (user) => user.directMessage_to, { nullable: false })
  @JoinColumn({ name: "user_to_id" })
  @Index()
  user_to_id: Users;

  @Column({ type: "text" })
  message: string;

  @CreateDateColumn({ type: "timestamp with time zone" })
  @IsDate()
  created_at: Date;

  @OneToMany(
    () => DirectMessageInfo,
    (directMessageInfo) => directMessageInfo.last_checked_message_id
  )
  directMessageInfo: DirectMessageInfo[];
}
