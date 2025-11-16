import { Entity, Column, ManyToOne, OneToMany, Index, JoinColumn } from 'typeorm';
import { Form } from './form.entity';
import { FormQuestion } from './form-question.entity';
import { BaseEntity } from '../common/entities/base.entity';

@Entity('form_topics')
export class FormTopic extends BaseEntity {
  @Index()
  @Column({ name: 'form_id' })
  form_id: number;

  @ManyToOne(() => Form, form => form.topics, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'form_id' })
  form: Form;

  @Column({ length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'integer' })
  order: number;

  @OneToMany(() => FormQuestion, question => question.topic)
  questions: FormQuestion[];
}
