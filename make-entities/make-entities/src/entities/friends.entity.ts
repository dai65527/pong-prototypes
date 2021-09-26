import {
  Entity,
  CreateDateColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Index,
  JoinColumn,
} from "typeorm";
import { IsDate } from "class-validator";
import { Users } from "./users.entity";

@Entity()
export class Friends {
  @ManyToOne(() => Users, (user) => user.invites_from)
  @JoinColumn({ name: "user_from_id" })
  @PrimaryColumn()
  @Index()
  user_from_id: number;

  @ManyToOne(() => Users, (user) => user.invites_to)
  @JoinColumn({ name: "user_to_id" })
  @PrimaryColumn()
  @Index()
  user_to_id: number;

  @CreateDateColumn({ type: "timestamp with time zone" })
  @IsDate()
  created_at: Date;

  @JoinColumn()
  user: Users;
}