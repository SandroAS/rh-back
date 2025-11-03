import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../common/entities/base.entity';
import { FormQuestion } from './form-question.entity';
import { FormApplicationQuestionOption } from './form-application-question-option.entity';

@Entity('form_question_options')
export class FormQuestionOption extends BaseEntity {
  @Column({ name: 'question_id', type: 'int' })
  question_id: number;

  @Column({ type: 'varchar', length: 255 })
  text: string;

  @Column({ type: 'int' })
  order: number;

  @ManyToOne(() => FormQuestion, (question) => question.options, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'question_id' })
  question: FormQuestion;

  @OneToMany(() => FormApplicationQuestionOption, (appOption) => appOption.baseOption)
  applicationOptions: FormApplicationQuestionOption[];
}