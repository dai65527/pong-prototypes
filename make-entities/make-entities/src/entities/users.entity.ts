import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  Check,
  Index,
  JoinColumn,
} from "typeorm";
import { IsDate, IsEmail, Min } from "class-validator";
import { Invites } from "./Invites.entity";

@Entity()
@Check(`"rate" >= 0`)
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ unique: true })
  name: string;

  @Index()
  @Column({ unique: true })
  intra_id: string;

  @Column({ nullable: true })
  @IsEmail()
  email: string;

  @Column({ default: 0 })
  @Min(0)
  rate: number;

  @Column()
  status: number;

  @Column()
  onetimepass_digest: string;

  @Column()
  remenber_digest: string;

  @Column({ nullable: true })
  avatar: string;

  @OneToMany(() => Invites, (invite) => invite.user_from)
  invites_from: Invites[];

  @OneToMany(() => Invites, (invite) => invite.user_to)
  invites_to: Invites[];

  @CreateDateColumn()
  @IsDate()
  created_at: Date;

  @UpdateDateColumn()
  @IsDate()
  updated_at: Date;
}
