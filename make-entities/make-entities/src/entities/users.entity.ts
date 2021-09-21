import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  Check,
  Index,
} from "typeorm";
import { IsDate, IsEmail, Min } from "class-validator";

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

  @CreateDateColumn()
  @IsDate()
  created_at: Date;

  @UpdateDateColumn()
  @IsDate()
  updated_at: Date;
}
