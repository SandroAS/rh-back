import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Account } from './account.entity';
import { JobPosition } from './job-position.entity';
import { JobPositionsLevel } from './job-position-level.entity';

@Entity('job_positions_levels_groups')
export class JobPositionsLevelsGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid', unique: true })
  uuid: string;

  @BeforeInsert()
  generateUuid() {
    this.uuid = uuidv4();
  }

  @Column({ name: 'account_id' })
  account_id: number;

  @ManyToOne(() => Account, (account) => account.jobPositionsLevelsGroups, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'account_id' })
  account: Account;

  @Column()
  name: string;

  @ManyToOne(() => JobPosition, (jobPosition) => jobPosition.levelsGroups, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'job_position_id' })
  job_position: JobPosition;

  @Column({ name: 'job_position_id', nullable: true })
  job_position_id: number;

  @OneToMany(
    () => JobPositionsLevel,
    (jobPositionsLevel) => jobPositionsLevel.group
  )
  levels: JobPositionsLevel[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
