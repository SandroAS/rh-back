import { Entity, Column, OneToMany, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';
import { Account } from './account.entity';
import { JobPositionsLevelsGroup } from './job-positions-levels-group.entity';
import { BaseEntity } from '../common/entities/base.entity';
import { DRD } from './drd.entity';

@Entity('job_positions')
export class JobPosition extends BaseEntity {
  @Column({ name: 'account_id', nullable: true })
  account_id: number;

  @ManyToOne(() => Account, (account) => account.jobPositions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'account_id' })
  account: Account;

  @Column({ name: 'title' })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ name: 'cbo_code', nullable: true })
  cbo_code: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  base_salary: number;

  @OneToMany(() => User, (user) => user.jobPosition)
  users: User[];

  @OneToOne(() => JobPositionsLevelsGroup, (levelsGroup) => levelsGroup.jobPositions, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'job_positions_levels_group_id' })
  levelsGroup: JobPositionsLevelsGroup;

  @Column({ name: 'job_positions_levels_group_id', nullable: true })
  job_positions_levels_group_id: number;

  @OneToOne(() => DRD, (drd) => drd.jobPosition)
  drd: DRD;
}
