import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, ManyToOne, JoinColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Account } from './account.entity';
import { JobPositionsLevelsGroup } from './job-positions-levels-group.entity';

@Entity('job_positions_levels')
export class JobPositionsLevel {
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

  @ManyToOne(() => Account, (account) => account.jobPositionsLevels, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'account_id' })
  account: Account;

  @Column()
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  salary: number;

  @ManyToOne(
    () => JobPositionsLevelsGroup,
    (jobPositionsLevelsGroup) => jobPositionsLevelsGroup.levels,
    { onDelete: 'SET NULL', nullable: true }
  )
  @JoinColumn({ name: 'job_positions_levels_group_id' })
  group: JobPositionsLevelsGroup;

  @Column({ name: 'job_positions_levels_group_id', nullable: true })
  job_positions_levels_group_id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
