import { Entity, Column, ManyToOne, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from '../common/entities/base.entity';
import { Form } from './form.entity';
import { FormApplicationQuestion } from './form-application-question.entity';
import { EvaluationApplication } from './evaluation-application.entity';
import { FormResponse } from './form-response.entity';
import { FormApplicationTopic } from './form-application-topic.entity';

export enum FormApplicationAccessedFrom {
  EMAIL = 'EMAIL',
  WHATSAPP = 'WHATSAPP',
  SYSTEM = 'SYSTEM',
}

@Entity('form_applications')
export class FormApplication extends BaseEntity {
  @Column({ name: 'account_id', type: 'int' })
  account_id: number;

  @Column({ name: 'base_form_id', type: 'int' })
  base_form_id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ name: 'accessed_from', type: 'enum', enum: FormApplicationAccessedFrom, nullable: true })
  accessed_from: FormApplicationAccessedFrom | null;

  @ManyToOne(() => Form, (form) => form.applications, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'base_form_id' })
  baseForm: Form;

  @OneToMany(() => FormApplicationQuestion, (question) => question.application)
  questions: FormApplicationQuestion[];

  @OneToOne(() => EvaluationApplication, (evaluationApp) => evaluationApp.formApplication)
  evaluationApplication: EvaluationApplication;

  @OneToMany(() => FormResponse, (response) => response.formApplication)
  responses: FormResponse[];

  @OneToMany(() => FormApplicationTopic, (applicationTopic) => applicationTopic.application)
  applicationTopics: FormApplicationTopic[];
}
