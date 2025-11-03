import { Entity, Column, ManyToOne, JoinColumn, OneToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../common/entities/base.entity';
import { FormResponse } from './form-response.entity';
import { FormApplicationQuestion } from './form-application-question.entity';
import { FormApplicationQuestionOption } from './form-application-question-option.entity';
import { FormAnswerMultiOption } from './form-answer-multi-option.entity';

@Entity('form_answers')
export class FormAnswer extends BaseEntity {
  @Column({ name: 'response_id', type: 'int' })
  response_id: number;

  @Column({ name: 'application_question_id', type: 'int' })
  application_question_id: number;

  @Column({ name: 'text_value', type: 'text', nullable: true })
  text_value: string | null; 

  @Column({ name: 'application_option_id', type: 'int', nullable: true })
  application_option_id: number | null; 

  @ManyToOne(() => FormResponse, (response) => response.answers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'response_id' })
  response: FormResponse;

  @ManyToOne(() => FormApplicationQuestion, (question) => question.answers, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'application_question_id' })
  applicationQuestion: FormApplicationQuestion;

  @ManyToOne(() => FormApplicationQuestionOption, (option) => option.singleChoiceAnswers, { onDelete: 'RESTRICT', nullable: true })
  @JoinColumn({ name: 'application_option_id' })
  applicationOption: FormApplicationQuestionOption | null;

  @OneToMany(() => FormAnswerMultiOption, (multi) => multi.answer)
  multiOptions: FormAnswerMultiOption[];
}