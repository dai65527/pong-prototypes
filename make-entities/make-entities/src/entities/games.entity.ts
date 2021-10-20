import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
  Check,
} from "typeorm";
import { IsDate, IsIn, Min } from "class-validator";
import { Users } from "./users.entity";

@Entity()
@Check(`"points_to_win" IN (5, 10, 15)`)
export class Games {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, (user) => user.games_user_first)
  @JoinColumn({ name: "user_first_id" })
  @Index()
  user_first: Users;

  @ManyToOne(() => Users, (user) => user.games_user_second)
  @JoinColumn({ name: "user_second_id" })
  @Index()
  user_second: Users;

  @Column({ default: 0 })
  @Min(0)
  user_first_point: number;

  @Column({ default: 0 })
  @Min(0)
  user_second_point: number;

  @Column()
  user_first_level: number;

  @Column()
  user_second_level: number;

  @Column({ default: 10 })
  @IsIn([5, 10, 15])
  points_to_win: number;

  @Column()
  bar_length: number;

  @Column()
  ball_speed: number;

  @Column()
  map_id: number;

  @CreateDateColumn({ type: "timestamp with time zone" })
  @IsDate()
  created_at: Date;

  @Column({ nullable: true, type: "timestamp with time zone" })
  @IsDate()
  started_at: Date;

  @Column({ nullable: true, type: "timestamp with time zone" })
  @IsDate()
  @Index()
  finished_at: Date;

  @UpdateDateColumn({ type: "timestamp with time zone" })
  @IsDate()
  updated_at: Date;
}
