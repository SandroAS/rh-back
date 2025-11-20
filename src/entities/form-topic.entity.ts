import { Entity, Column, ManyToOne, OneToMany, Index, JoinColumn } from 'typeorm';
import { Form } from './form.entity';
import { FormQuestion } from './form-question.entity';
import { BaseEntity } from '../common/entities/base.entity';
import { DRDTopic } from './drd-topic.entity';

@Entity('form_topics')
export class FormTopic extends BaseEntity {
  @Index()
  @Column({ name: 'form_id' })
  form_id: number;

  @ManyToOne(() => Form, form => form.topics, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'form_id' })
  form: Form;

  @Index()
  @Column({ name: 'drd_topic_id', type: 'int', nullable: true })
  drd_topic_id: number | null;

  @ManyToOne(() => DRDTopic, drdTopic => drdTopic.formTopics, { onDelete: 'RESTRICT', nullable: true })
  @JoinColumn({ name: 'drd_topic_id' })
  drdTopic: DRDTopic | null;

  @Column({ length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'integer' })
  order: number;

  @OneToMany(() => FormQuestion, question => question.topic)
  questions: FormQuestion[];
}
