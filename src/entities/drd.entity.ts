import { Entity, Column, ManyToOne, JoinColumn, OneToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../common/entities/base.entity';
import { Account } from './account.entity';
import { User } from './user.entity';
import { JobPosition } from './job-position.entity';
import { DRDTopic } from './drd-topic.entity';
import { DRDLevel } from './drd-level.entity';
import { DRDMetric } from './drd-metric.entity';
import { Evaluation } from './evaluation.entity';

@Entity('drds')
export class DRD extends BaseEntity {
  @Column({ name: 'account_id', type: 'int' })
  account_id: number;

  @Column({ name: 'created_by_user_id', type: 'int' })
  created_by_user_id: number;

  @Column({ name: 'job_position_id', type: 'int' })
  job_position_id: number;

  @Column({ type: 'int', default: 0, unsigned: true })
  rate: number;

  @ManyToOne(() => Account, (account) => account.drds)
  @JoinColumn({ name: 'account_id' })
  account: Account;

  @ManyToOne(() => User, (user) => user.created_drds)
  @JoinColumn({ name: 'created_by_user_id' })
  createdBy: User;

  @OneToOne(() => JobPosition, (jobPosition) => jobPosition.drd)
  @JoinColumn({ name: 'job_position_id' })
  jobPosition: JobPosition;

  @OneToMany(() => DRDTopic, (topic) => topic.drd)
  topics: DRDTopic[];

  @OneToMany(() => DRDLevel, (level) => level.drd)
  levels: DRDLevel[];

  @OneToMany(() => DRDMetric, (metric) => metric.drd)
  metrics: DRDMetric[];

  @OneToMany(() => Evaluation, (evaluation) => evaluation.drd)
  evaluations: Evaluation[];
}
