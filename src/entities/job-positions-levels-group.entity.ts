import { Entity, Column, ManyToOne, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Account } from './account.entity';
import { JobPosition } from './job-position.entity';
import { JobPositionsLevel } from './job-position-level.entity';
import { BaseEntity } from '../common/entities/base.entity';
import { User } from './user.entity'; // Importe a entidade User

@Entity('job_positions_levels_groups')
export class JobPositionsLevelsGroup extends BaseEntity {
  @Column({ name: 'account_id' })
  account_id: number;

  @ManyToOne(() => Account, (account) => account.jobPositionsLevelsGroups, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'account_id' })
  account: Account;

  @Column({ name: 'created_by_user_id'})
  created_by_user_id: number;

  @ManyToOne(() => User, (user) => user.jobPositionsLevelsGroups)
  @JoinColumn({ name: 'created_by_user_id' })
  createdBy: User;

  @Column()
  name: string;

  @OneToMany(() => JobPosition, (jobPosition) => jobPosition.levelsGroup)
  jobPositions: JobPosition[];

  @OneToMany(
    () => JobPositionsLevel,
    (jobPositionsLevel) => jobPositionsLevel.jobPositionsLevelsGroup
  )
  jobPositionsLevels: JobPositionsLevel[];
}
