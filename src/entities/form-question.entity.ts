import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../common/entities/base.entity';
import { Form } from './form.entity';
import { FormQuestionOption } from './form-question-option.entity';
import { FormApplicationQuestion } from './form-application-question.entity';

export enum QuestionType {
  SHORT_TEXT = 'SHORT_TEXT',
  LONG_TEXT = 'LONG_TEXT',
  SINGLE_CHOICE = 'SINGLE_CHOICE',
  MULTI_CHOICE = 'MULTI_CHOICE',
  DROPDOWN = 'DROPDOWN',
}

@Entity('form_questions')
export class FormQuestion extends BaseEntity {
  @Column({ name: 'form_id', type: 'int' })
  form_id: number;

  @Column({ type: 'text' })
  text: string;

  @Column({ 
    type: 'enum', 
    enum: QuestionType 
  })
  type: QuestionType;

  @Column({ type: 'int' })
  order: number;

  @Column({ type: 'boolean', default: false })
  is_required: boolean;

  @ManyToOne(() => Form, (form) => form.questions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'form_id' })
  form: Form;

  @OneToMany(() => FormQuestionOption, (option) => option.question)
  options: FormQuestionOption[];

  @OneToMany(() => FormApplicationQuestion, (appQuestion) => appQuestion.baseQuestion)
  applicationQuestions: FormApplicationQuestion[];
}