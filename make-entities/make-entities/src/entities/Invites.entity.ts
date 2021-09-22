import {
  Entity,
  CreateDateColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Index,
} from "typeorm";
import { IsDate } from "class-validator";
import { Users } from "./users.entity";

@Entity()
@Index(["user_from", "user_to"], { unique: true })
export class Invites {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, (user) => user.invites_from)
  user_from: Users;

  @ManyToOne(() => Users, (user) => user.invites_to)
  user_to: Users;

  @CreateDateColumn()
  @IsDate()
  created_at: Date;
}
