import { Entity, Column, ManyToOne, JoinColumn, OneToMany, Index } from 'typeorm';
import { BaseEntity } from '../common/entities/base.entity';
import { Form } from './form.entity';
import { FormQuestionOption } from './form-question-option.entity';
import { FormApplicationQuestion } from './form-application-question.entity';
import { FormTopic } from './form-topic.entity';
import { QuestionType } from '../common/enums/question-type.enum';
import { DRDTopicItem } from './drd-topic-item.entity';

@Entity('form_questions')
export class FormQuestion extends BaseEntity {
  @Index()
  @Column({ name: 'form_id'})
  form_id: number | null; 

  @Index()
  @Column({ name: 'topic_id', nullable: true })
  topic_id: number | null;

  @Index()
  @Column({ name: 'drd_topic_item_id', type: 'int', nullable: true })
  drd_topic_item_id: number | null;

  @Column({ length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ 
    type: 'enum', 
    enum: QuestionType 
  })
  type: QuestionType;

  @Column({ type: 'int' })
  order: number;

  @Column({ type: 'boolean', default: false })
  is_required: boolean;

  @ManyToOne(() => Form, (form) => form.formQuestions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'form_id' })
  form: Form;

  @OneToMany(() => FormQuestionOption, option => option.question)
  options: FormQuestionOption[];

  @OneToMany(() => FormApplicationQuestion, (appQuestion) => appQuestion.baseQuestion)
  applicationQuestions: FormApplicationQuestion[];

  @ManyToOne(() => FormTopic, topic => topic.questions, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'topic_id' })
  topic: FormTopic | null;

  @ManyToOne(() => DRDTopicItem, drdTopicItem => drdTopicItem.formQuestions, { onDelete: 'RESTRICT', nullable: true })
  @JoinColumn({ name: 'drd_topic_item_id' })
  drdTopicItem: DRDTopicItem | null;
}
