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
export class Invites {
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

  @CreateDateColumn()
  @IsDate()
  created_at: Date;

  @JoinColumn()
  user: Users;
}
