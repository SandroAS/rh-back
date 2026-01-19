import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../common/entities/base.entity';
import { Evaluation } from './evaluation.entity';
import { FormApplication } from './form-application.entity';
import { FormResponse } from './form-response.entity';
import { User } from './user.entity';
import { DRD } from './drd.entity';
import { Notification } from './notification.entity';

export enum EvaluationType {
  SELF = 'SELF',
  PEER = 'PEER',
  LEADER = 'LEADER',
  SUBORDINATE = 'SUBORDINATE',
  CLIENT = 'CLIENT',
  OTHER = 'OTHER',
}

export enum EvaluationApplicationStatus {
  CREATED = 'CREATED',
  SENDED = 'SENDED',
  ACCESSED = 'ACCESSED',
  IN_PROGRESS = 'IN_PROGRESS',
  FINISHED = 'FINISHED',
  CANCELED = 'CANCELED',
  EXPIRED = 'EXPIRED',
}

export enum EvaluationRecurrence {
  MONTHLY = 'MONTHLY',
  BIMONTHLY = 'BIMONTHLY',
  TRIMESTRIAL = 'TRIMESTRIAL',
  SEMESTRIAL = 'SEMESTRIAL',
  ANNUAL = 'ANNUAL',
}

@Entity('evaluation_applications')
export class EvaluationApplication extends BaseEntity {
  @Column({ name: 'account_id', type: 'int' })
  account_id: number;

  @Column({ name: 'evaluation_id', type: 'int' })
  evaluation_id: number;

  @Column({ name: 'form_application_id', type: 'int' })
  form_application_id: number;

  @Column({ name: 'drd_id', type: 'int', nullable: true })
  drd_id: number | null;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  rate: number;

  @ManyToOne(() => DRD, (drd) => drd.evaluations, { onDelete: 'RESTRICT', nullable: true })
  @JoinColumn({ name: 'drd_id' })
  drd: DRD | null;

  @Column({
    type: 'enum',
    enum: EvaluationType,
  })
  type: EvaluationType;

  @Column({
    name: 'recurrence',
    type: 'enum',
    enum: EvaluationRecurrence,
    nullable: true,
  })
  recurrence: EvaluationRecurrence | null;

  @Column({ name: 'started_date', type: 'timestamp' })
  started_date: Date;

  @Column({ name: 'expiration_date', type: 'timestamp', nullable: true })
  expiration_date: Date | null;

  @Column({ name: 'expiration_days', type: 'int', nullable: true })
  expiration_days: number | null;

  @Column({ name: 'evaluated_user_id', type: 'int' })
  evaluated_user_id: number;

  @Column({ name: 'submitting_user_id', type: 'int' })
  submitting_user_id: number;

  @Column({ type: 'enum', enum: EvaluationApplicationStatus, default: EvaluationApplicationStatus.CREATED })
  status: EvaluationApplicationStatus;

  @ManyToOne(() => User, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'evaluated_user_id' })
  evaluatedUser: User;

  @ManyToOne(() => User, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'submitting_user_id' })
  submittingUser: User;
  
  @ManyToOne(() => Evaluation, (evaluation) => evaluation.applications, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'evaluation_id' })
  evaluation: Evaluation;

  @ManyToOne(() => FormApplication, (app) => app.evaluationApplication, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'form_application_id' })
  formApplication: FormApplication;

  @OneToMany(() => FormResponse, (response) => response.evaluationApplication)
  responses: FormResponse[];

  @OneToMany(() => Notification, (notification) => notification.evaluationApplication)
  notifications: Notification[];
}
