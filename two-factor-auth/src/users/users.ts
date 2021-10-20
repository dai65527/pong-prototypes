import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class Users {
  @PrimaryGeneratedColumn('increment', { name: 'userid' })
  userId: number;

  @Column({ name: 'firstname' })
  firstName: string;

  @Column({ name: 'lastname' })
  lastName: string;

  @Column({ name: 'email' })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true, name: 'refreshtoken' })
  refreshToken: string;

  @Column({ type: 'date', nullable: true, name: 'refreshtokenexp' })
  refreshTokenExp: string;

  @Column({ name: 'discodeid' })
  discodeid: string;

  @Column({ name: 'intra_id' })
  intra_id: string;

  @Column({ name: 'is_two_factor_authentication_enabled' })
  is_two_factor_authentication_enabled: boolean;

  @Column({ nullable: true })
  two_factor_authentication: string;
}
