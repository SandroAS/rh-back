import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../common/entities/base.entity';
import { FormApplication } from './form-application.entity';
import { EvaluationApplication } from './evaluation-application.entity';
import { FormAnswer } from './form-answer.entity';

@Entity('form_responses')
export class FormResponse extends BaseEntity {
  @Column({ name: 'form_application_id', type: 'int' })
  form_application_id: number;

  @Column({ name: 'evaluation_application_id', type: 'int', nullable: true })
  evaluation_application_id: number | null; 

  @Column({ name: 'user_id', type: 'int', nullable: true })
  user_id: number | null;

  @Column({ type: 'boolean', default: false })
  is_completed: boolean;

  @Column({ name: 'submitted_at', type: 'timestamp', nullable: true })
  submitted_at: Date | null;

  @ManyToOne(() => FormApplication, (app) => app.responses, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'form_application_id' })
  formApplication: FormApplication;
  
  @ManyToOne(() => EvaluationApplication, (app) => app.responses, { onDelete: 'RESTRICT', nullable: true })
  @JoinColumn({ name: 'evaluation_application_id' })
  evaluationApplication: EvaluationApplication | null;

  @OneToMany(() => FormAnswer, (answer) => answer.response)
  answers: FormAnswer[];
}