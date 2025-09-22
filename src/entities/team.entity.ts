import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../common/entities/base.entity';
import { Account } from './account.entity';
import { User } from './user.entity';
import { TeamMember } from './team-member.entity';

@Entity('teams')
export class Team extends BaseEntity {
  @Column({ name: 'account_id' })
  account_id: number;

  @ManyToOne(() => Account, (account) => account.teams, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'account_id' })
  account: Account;

  @Column({ name: 'created_by_user_id' })
  created_by_user_id: number;

  @ManyToOne(() => User, (user) => user.teams)
  @JoinColumn({ name: 'created_by_user_id' })
  createdBy: User;

  @Column({ unique: true })
  name: string;

  // Relacionamento com os membros do time
  @OneToMany(() => TeamMember, (teamMember) => teamMember.team)
  teamMembers: TeamMember[];
}