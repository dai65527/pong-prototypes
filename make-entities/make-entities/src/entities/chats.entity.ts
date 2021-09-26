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

@Entity()
export class Chats {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  name: string;

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
  password_digest: string;

  @CreateDateColumn()
  @IsDate()
  created_at: Date;

  @UpdateDateColumn()
  @IsDate()
  updated_at: Date;
}
