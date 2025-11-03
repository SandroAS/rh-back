import { Entity, Column, ManyToOne, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../common/entities/base.entity';
import { FormApplicationQuestion } from './form-application-question.entity';
import { FormQuestionOption } from './form-question-option.entity';
import { FormAnswer } from './form-answer.entity';
import { FormAnswerMultiOption } from './form-answer-multi-option.entity';

@Entity('form_application_question_options')
export class FormApplicationQuestionOption extends BaseEntity {
  @Column({ name: 'application_question_id', type: 'int' })
  application_question_id: number;

  @Column({ name: 'base_option_id', type: 'int' })
  base_option_id: number;

  @Column({ type: 'varchar', length: 255 })
  text: string;

  @Column({ type: 'int' })
  order: number;

  @ManyToOne(() => FormApplicationQuestion, (question) => question.options, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'application_question_id' })
  applicationQuestion: FormApplicationQuestion;

  @ManyToOne(() => FormQuestionOption, (option) => option.applicationOptions, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'base_option_id' })
  baseOption: FormQuestionOption;

  @OneToMany(() => FormAnswer, (answer) => answer.applicationOption)
  singleChoiceAnswers: FormAnswer[];

  @OneToMany(() => FormAnswerMultiOption, (multi) => multi.applicationOption)
  multiChoiceLinks: FormAnswerMultiOption[];
}