import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, ManyToMany, OneToMany } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Account } from './account.entity';

export enum SystemModuleName {
  EMPLOYEE_MANAGEMENT = 'employee_management',
  RECRUITMENT = 'recruitment',
  PERFORMANCE_MANAGEMENT = 'performance_management',
  CAREER_DEVELOPMENT = 'career_development',
  TRAINING_DEVELOPMENT = 'training_development',
  PAYROLL = 'payroll',
  TIME_ATTENDANCE = 'time_attendance',
  BENEFITS_COMPENSATION = 'benefits_compensation',
  ONBOARDING_OFFBOARDING = 'onboarding_offboarding',
}

@Entity('system_modules')
export class SystemModule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid', unique: true })
  uuid: string;

  @BeforeInsert()
  generateUuid() {
    this.uuid = uuidv4();
  }

  @Column({
    type: 'enum',
    enum: SystemModuleName,
    unique: true,
  })
  name: SystemModuleName;

  @ManyToMany(() => Account, (account) => account.systemModules)
  accounts: Account[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ 
    type: 'timestamp', 
    default: () => 'CURRENT_TIMESTAMP', 
    onUpdate: 'CURRENT_TIMESTAMP' 
  })
  updated_at: Date;
}