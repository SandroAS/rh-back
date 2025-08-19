import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { User } from './user.entity';
import { Account } from './account.entity';
import { JobPositionsLevelsGroup } from './job-positions-levels-group.entity';

@Entity('job_positions')
export class JobPosition {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid', unique: true })
  uuid: string;

  @BeforeInsert()
  generateUuid() {
    this.uuid = uuidv4();
  }

  @Column({ name: 'account_id', nullable: true })
  account_id: number;

  @ManyToOne(() => Account, (account) => account.jobPositions, { nullable: true, onDelete: 'CASCADE' })
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

  @OneToMany(
    () => JobPositionsLevelsGroup,
    (levelsGroup) => levelsGroup.job_position
  )
  levelsGroups: JobPositionsLevelsGroup[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
