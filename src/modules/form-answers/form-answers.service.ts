import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { FormAnswer } from '@/entities/form-answer.entity';
import { FormApplicationQuestion } from '@/entities/form-application-question.entity';
import { QuestionType } from '@/common/enums/question-type.enum';
import { CreateFormAnswerDto } from './dtos/create-form-answer.dto';
import { FormAnswerMultiOptionsService } from '../form-answer-multi-options/form-answer-multi-options.service';

@Injectable()
export class FormAnswersService {
  constructor(
    @InjectRepository(FormAnswer)
    private readonly answerRepository: Repository<FormAnswer>,
    private readonly multiOptionService: FormAnswerMultiOptionsService,
  ) {}

  /**
   * Cria uma resposta individual dentro de uma transação.
   */
  async createInTransaction(
    formResponseId: number,
    question: FormApplicationQuestion,
    answerData: CreateFormAnswerDto,
    manager: EntityManager,
  ): Promise<FormAnswer> {
    
    const newAnswer = manager.create(FormAnswer, {
      response_id: formResponseId,
      application_question_id: question.id,
    });

    switch (question.type) {
      case QuestionType.SHORT_TEXT:
      case QuestionType.LONG_TEXT:
        newAnswer.text_value = answerData.text_value;
        break;

      case QuestionType.SINGLE_CHOICE:
      case QuestionType.DROPDOWN:
        if (answerData.application_option_uuid) {
          const selectedOption = question.options?.find(
            opt => opt.uuid === answerData.application_option_uuid
          );
          
          if (!selectedOption) {
            throw new NotFoundException(`Opção selecionada inválida para a questão ${question.uuid}.`);
          }
          newAnswer.application_option_id = selectedOption.id;
        }
        break;

      case QuestionType.RATE:
      case QuestionType.NUMBER:
        newAnswer.number_value = answerData.number_value;
        break;

      case QuestionType.MULTI_CHOICE:
        break;

      default:
        newAnswer.text_value = answerData.text_value;
        newAnswer.number_value = answerData.number_value;
    }

    const savedAnswer = await manager.save(FormAnswer, newAnswer);

    if (question.type === QuestionType.MULTI_CHOICE && answerData.multiOptions?.length > 0) {
      const selectedUuids = answerData.multiOptions.map(opt => opt.application_option_uuid);
      
      const validOptionIds = question.options
        ?.filter(opt => selectedUuids.includes(opt.uuid))
        .map(opt => opt.id) || [];

      if (validOptionIds.length > 0) {
        await this.multiOptionService.saveMultiOptions(
          savedAnswer.id, 
          validOptionIds, 
          manager
        );
      }
    }

    return savedAnswer;
  }
}
