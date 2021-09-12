import { BaseEntity, PrimaryGeneratedColumn, Entity, Column } from "typeorm";
import { IMessage } from "@shared/chat/chat";

@Entity()
// export class Message extends BaseEntity implements IMessage {
export class Message extends BaseEntity implements IMessage {
  constructor(sender: string, message: string) {
    super();
    this.sender = sender;
    this.message = message;
  }

  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    type: "varchar",
    length: 255,
    nullable: false,
  })
  public sender: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: false,
  })
  public message: string;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  public date: Date;
}
