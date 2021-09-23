import { IsDate } from "class-validator";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from "typeorm";
import { Users } from "./users.entity";

@Entity()
export class DirectMessages {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, (user) => user.directMessage_from, {
    nullable: false,
  })
  @JoinColumn({ name: "user_from_id" })
  user_from_id: Users;

  @ManyToOne(() => Users, (user) => user.directMessage_to, { nullable: false })
  @JoinColumn({ name: "user_to_id" })
  user_to_id: Users;

  @Column({ type: "text" })
  message: string;

  @CreateDateColumn()
  @IsDate()
  created_at: Date;
}
