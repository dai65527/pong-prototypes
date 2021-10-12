import { BaseEntity, PrimaryGeneratedColumn, Entity, Column } from "typeorm";

@Entity({ name: "users" })
export class User extends BaseEntity {
  constructor(email: string, name: string, password: string) {
    super();
    this.email = email;
    this.name = name;
    this.password = password;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "text",
    unique: true,
    name: "name",
    nullable: false,
  })
  name: string;

  @Column({
    type: "text",
    unique: true,
    name: "intra_id",
    nullable: true,
  })
  intraId: string;

  @Column({
    type: "text",
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    type: "text",
    unique: false,
    name: "password",
  })
  password: string;
}
