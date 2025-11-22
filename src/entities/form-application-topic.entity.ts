import { Entity, Column, ManyToOne, OneToMany, Index, JoinColumn } from 'typeorm';
import { BaseEntity } from '../common/entities/base.entity';
import { FormTopic } from './form-topic.entity';
import { FormApplication } from './form-application.entity';
import { FormApplicationQuestion } from './form-application-question.entity';
import { DRDTopic } from './drd-topic.entity';

@Entity('form_application_topics')
export class FormApplicationTopic extends BaseEntity {
  @Index()
  @Column({ name: 'form_application_id' })
  form_application_id: number;

  @ManyToOne(() => FormApplication, (application) => application.applicationTopics, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'form_application_id' })
  application: FormApplication;

  @Index()
  @Column({ name: 'base_form_topic_id', type: 'int' })
  base_form_topic_id: number;
  
  @ManyToOne(() => FormTopic, (formTopic) => formTopic.applicationTopics, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'base_form_topic_id' })
  baseFormTopic: FormTopic;

  @Index()
  @Column({ name: 'drd_topic_id', type: 'int', nullable: true })
  drd_topic_id: number | null;

  @ManyToOne(() => DRDTopic, drdTopic => drdTopic.formApplicationTopics, { onDelete: 'RESTRICT', nullable: true })
  @JoinColumn({ name: 'drd_topic_id' })
  drdTopic: DRDTopic | null;

  @Column({ length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'integer' })
  order: number;

  @OneToMany(() => FormApplicationQuestion, (question) => question.topic)
  questions: FormApplicationQuestion[];
}
