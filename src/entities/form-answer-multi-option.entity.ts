import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { FormAnswer } from './form-answer.entity';
import { FormApplicationQuestionOption } from './form-application-question-option.entity';
import { BaseEntity } from '../common/entities/base.entity';

@Entity('form_answer_multi_options')
export class FormAnswerMultiOption extends BaseEntity {
  @Column({ name: 'answer_id', type: 'int' })
  answer_id: number;

  @Column({ name: 'application_option_id', type: 'int' })
  application_option_id: number;

  @ManyToOne(() => FormAnswer, (answer) => answer.multiOptions, { 
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn({ name: 'answer_id' })
  answer: FormAnswer;

  @ManyToOne(() => FormApplicationQuestionOption, (option) => option.multiChoiceLinks, { 
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
  })
  @JoinColumn({ name: 'application_option_id' })
  applicationOption: FormApplicationQuestionOption;
}
