import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../common/entities/base.entity';
import { Evaluation } from './evaluation.entity';
import { FormApplication } from './form-application.entity';
import { FormResponse } from './form-response.entity';

export enum EvaluationType {
  SELF = 'SELF',
  PEER = 'PEER',
  LEADER = 'LEADER',
  SUBORDINATE = 'SUBORDINATE',
  CLIENT = 'CLIENT',
  OTHER = 'OTHER',
}

@Entity('evaluation_applications')
export class EvaluationApplication extends BaseEntity {
  @Column({ name: 'evaluation_id', type: 'int' })
  evaluation_id: number;

  @Column({ name: 'form_application_id', type: 'int' })
  form_application_id: number;

  @Column({
    type: 'enum',
    enum: EvaluationType,
  })
  type: EvaluationType;

  @Column({ name: 'started_date', type: 'timestamp' })
  started_date: Date;

  @Column({ name: 'expiration_date', type: 'timestamp' })
  expiration_date: Date;

  @Column({ name: 'evaluated_user_id', type: 'int' })
  evaluated_user_id: number;

  @Column({ name: 'submitting_user_id', type: 'int' })
  submitting_user_id: number;

  @ManyToOne(() => Evaluation, (evaluation) => evaluation.applications, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'evaluation_id' })
  evaluation: Evaluation;

  @ManyToOne(() => FormApplication, (app) => app.evaluationApplications, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'form_application_id' })
  formApplication: FormApplication;

  @OneToMany(() => FormResponse, (response) => response.evaluationApplication)
  responses: FormResponse[];
}