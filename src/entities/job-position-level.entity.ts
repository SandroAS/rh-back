import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Account } from './account.entity';
import { JobPositionsLevelsGroup } from './job-positions-levels-group.entity';
import { BaseEntity } from '../common/entities/base.entity';

@Entity('job_positions_levels')
export class JobPositionsLevel extends BaseEntity {
  @Column({ name: 'account_id' })
  account_id: number;

  @ManyToOne(() => Account, (account) => account.jobPositionsLevels, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'account_id' })
  account: Account;

  @Column()
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  salary: number;

  @ManyToOne(
    () => JobPositionsLevelsGroup,
    (jobPositionsLevelsGroup) => jobPositionsLevelsGroup.jobPositionsLevels,
    { onDelete: 'SET NULL', nullable: true }
  )
  @JoinColumn({ name: 'job_positions_levels_group_id' })
  jobPositionsLevelsGroup: JobPositionsLevelsGroup;

  @Column({ name: 'job_positions_levels_group_id', nullable: true })
  job_positions_levels_group_id: number;
}
