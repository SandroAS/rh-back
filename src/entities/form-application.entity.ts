import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../common/entities/base.entity';
import { Form } from './form.entity';
import { FormApplicationQuestion } from './form-application-question.entity';
import { EvaluationApplication } from './evaluation-application.entity';
import { FormResponse } from './form-response.entity';

@Entity('form_applications')
export class FormApplication extends BaseEntity {
  @Column({ name: 'base_form_id', type: 'int' })
  base_form_id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(() => Form, (form) => form.applications, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'base_form_id' })
  baseForm: Form;

  @OneToMany(() => FormApplicationQuestion, (question) => question.application)
  questions: FormApplicationQuestion[];

  @OneToMany(() => EvaluationApplication, (evaluationApp) => evaluationApp.formApplication)
  evaluationApplications: EvaluationApplication[];

  @OneToMany(() => FormResponse, (response) => response.formApplication)
  responses: FormResponse[];
}