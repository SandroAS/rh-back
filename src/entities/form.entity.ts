import { Entity, Column, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from '../common/entities/base.entity';
import { FormQuestion } from './form-question.entity';
import { FormApplication } from './form-application.entity';
import { Evaluation } from './evaluation.entity';
import { FormTopic } from './form-topic.entity';

export enum FormStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

@Entity('forms')
export class Form extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ 
    type: 'enum', 
    enum: FormStatus, 
    default: FormStatus.DRAFT 
  })
  status: FormStatus;

  @OneToMany(() => FormQuestion, question => question.form, { cascade: ['insert', 'update'] })
  questions: FormQuestion[];
  
  @OneToMany(() => FormApplication, (application) => application.baseForm)
  applications: FormApplication[];

  @OneToOne(() => Evaluation, (evaluation) => evaluation.form)
  evaluation: Evaluation;

  @OneToMany(() => FormTopic, topic => topic.form, { cascade: ['insert', 'update'] })
  topics: FormTopic[];
}
