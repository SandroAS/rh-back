import { Entity, Column, ManyToOne, JoinColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../common/entities/base.entity';
import { Account } from './account.entity';
import { User } from './user.entity';
import { Team } from './team.entity';

@Entity('sectors')
export class Sector extends BaseEntity {
  @Column({ name: 'account_id' })
  account_id: number;

  @ManyToOne(() => Account, (account) => account.sectors, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'account_id' })
  account: Account;

  @Column({ name: 'created_by_user_id', nullable: true })
  created_by_user_id: number;

  @ManyToOne(() => User, (user) => user.sectors, { nullable: true })
  @JoinColumn({ name: 'created_by_user_id' })
  createdBy: User;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Team, (team) => team.sector)
  teams: Team[];

  @ManyToMany(() => User, (user) => user.sectors)
  @JoinTable({
    name: 'sector_has_users',
    joinColumn: { name: 'sector_id' },
    inverseJoinColumn: { name: 'user_id' },
  })
  users: User[];
}