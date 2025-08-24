import { Entity, Column, ManyToOne, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Account } from './account.entity';
import { JobPosition } from './job-position.entity';
import { JobPositionsLevel } from './job-position-level.entity';
import { BaseEntity } from '../common/entities/base.entity';

@Entity('job_positions_levels_groups')
export class JobPositionsLevelsGroup extends BaseEntity {
  @Column({ name: 'account_id' })
  account_id: number;

  @ManyToOne(() => Account, (account) => account.jobPositionsLevelsGroups, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'account_id' })
  account: Account;

  @Column()
  name: string;

  @OneToOne(() => JobPosition, (jobPosition) => jobPosition.levelsGroup)
  @JoinColumn({ name: 'job_position_id' })
  job_position: JobPosition;

  @Column({ name: 'job_position_id', nullable: true })
  job_position_id: number;

  @OneToMany(
    () => JobPositionsLevel,
    (jobPositionsLevel) => jobPositionsLevel.jobPositionsLevelsGroup
  )
  jobPositionsLevels: JobPositionsLevel[];
}
