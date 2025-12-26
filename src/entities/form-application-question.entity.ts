import { Entity, Column, ManyToOne, JoinColumn, OneToMany, Index } from 'typeorm';
import { BaseEntity } from '../common/entities/base.entity';
import { FormApplication } from './form-application.entity';
import { FormQuestion } from './form-question.entity';
import { FormApplicationQuestionOption } from './form-application-question-option.entity';
import { FormAnswer } from './form-answer.entity';
import { QuestionType } from '../common/enums/question-type.enum';
import { FormApplicationTopic } from './form-application-topic.entity';

@Entity('form_application_questions')
export class FormApplicationQuestion extends BaseEntity {
  @Column({ name: 'application_id', type: 'int' })
  application_id: number;

  @Column({ name: 'base_question_id', type: 'int' })
  base_question_id: number;

  @Index()
  @Column({ name: 'form_application_topic_id', type: 'int', nullable: true })
  form_application_topic_id: number | null; 

  @ManyToOne(() => FormApplicationTopic, (topic) => topic.questions, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'form_application_topic_id' })
  topic: FormApplicationTopic | null;

  @Column({ length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'enum', enum: QuestionType })
  type: QuestionType;

  @Column({ type: 'boolean', default: false })
  is_required: boolean;

  @Column({ type: 'int' })
  order: number;

  @ManyToOne(() => FormApplication, (application) => application.questions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'application_id' })
  application: FormApplication;

  @ManyToOne(() => FormQuestion, (question) => question.applicationQuestions, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'base_question_id' })
  baseQuestion: FormQuestion;

  @OneToMany(() => FormApplicationQuestionOption, (option) => option.applicationQuestion)
  options: FormApplicationQuestionOption[];

  @OneToMany(() => FormAnswer, (answer) => answer.applicationQuestion)
  answers: FormAnswer[];
}