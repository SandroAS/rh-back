import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { BaseEntity } from '../common/entities/base.entity';
import { Account } from './account.entity';
import { Team } from './team.entity';
import { User } from './user.entity';

@Entity('team_members')
export class TeamMember extends BaseEntity {
  @Column({ name: 'account_id' })
  account_id: number;

  @ManyToOne(() => Account, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'account_id' })
  account: Account;

  @PrimaryColumn({ name: 'team_id' })
  team_id: number;

  @PrimaryColumn({ name: 'user_id' })
  user_id: number;

  @ManyToOne(() => Team, (team) => team.teamMembers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'team_id' })
  team: Team;

  @ManyToOne(() => User, (user) => user.teamMembers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}