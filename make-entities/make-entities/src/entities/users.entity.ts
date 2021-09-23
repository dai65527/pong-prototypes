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
import { Invites } from "./Invites.entity";
import { DirectMessages } from "./direct_messages.entity";

@Entity()
@Check(`"rate" >= 0`)
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ type: "text", unique: true })
  name: string;

  @Index()
  @Column({ type: "text", unique: true })
  intra_id: string;

  @Column({ type: "text", nullable: true })
  @IsEmail()
  email: string;

  @Column({ default: 0 })
  @Min(0)
  rate: number;

  @Column()
  status: number;

  @Column({ type: "text" })
  onetimepass_digest: string;

  @Column({ type: "text" })
  remenber_digest: string;

  @Column({ type: "text", nullable: true })
  avatar: string;

  @CreateDateColumn()
  @IsDate()
  created_at: Date;

  @UpdateDateColumn()
  @IsDate()
  updated_at: Date;

  @OneToMany(() => Invites, (invite) => invite.user_from_id)
  invites_from: Invites[];

  @OneToMany(() => Invites, (invite) => invite.user_to_id)
  invites_to: Invites[];

  @OneToMany(
    () => DirectMessages,
    (directMessage) => directMessage.user_from_id
  )
  directMessage_from: Invites[];

  @OneToMany(() => DirectMessages, (directMessage) => directMessage.user_to_id)
  directMessage_to: Invites[];
}
