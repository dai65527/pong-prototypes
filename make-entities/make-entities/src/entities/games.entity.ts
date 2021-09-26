import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
} from "typeorm";
import { IsDate, Min } from "class-validator";
import { Users } from "./users.entity";

@Entity()
export class Games {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, (user) => user.games_user_first_id)
  @JoinColumn({ name: "user_first_id" })
  @Index()
  user_first_id: number;

  @ManyToOne(() => Users, (user) => user.games_user_second_id)
  @JoinColumn({ name: "user_second_id" })
  @Index()
  user_second_id: number;

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

  @Column()
  points_to_win: number;

  @Column()
  bar_length: number;

  @Column()
  ball_speed: number;

  @Column()
  map_id: number;

  @CreateDateColumn()
  @IsDate()
  created_at: Date;

  @Column({ nullable: true })
  @IsDate()
  started_at: Date;

  @Column({ nullable: true })
  @IsDate()
  finished_at: Date;

  @UpdateDateColumn()
  @IsDate()
  updated_at: Date;
}
