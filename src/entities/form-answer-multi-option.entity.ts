import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { FormAnswer } from './form-answer.entity';
import { FormApplicationQuestionOption } from './form-application-question-option.entity';

@Entity('form_answer_multi_options')
export class FormAnswerMultiOption {
  @PrimaryColumn({ name: 'answer_id', type: 'int' })
  answer_id: number;

  @PrimaryColumn({ name: 'application_option_id', type: 'int' })
  application_option_id: number;

  @ManyToOne(() => FormAnswer, (answer) => answer.multiOptions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'answer_id' })
  answer: FormAnswer;

  @ManyToOne(() => FormApplicationQuestionOption, (option) => option.multiChoiceLinks, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'application_option_id' })
  applicationOption: FormApplicationQuestionOption;
}
