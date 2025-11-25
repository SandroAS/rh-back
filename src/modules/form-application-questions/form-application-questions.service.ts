import { FormApplicationQuestion } from '@/entities/form-application-question.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { BaseService } from '@/common/services/base.service';
import { FormQuestion } from '@/entities/form-question.entity';
import { FormApplicationQuestionOptionsService } from '../form-application-question-options/form-application-question-options.service';


@Injectable()
export class FormApplicationQuestionsService extends BaseService<FormApplicationQuestion> {
  constructor(
    @InjectRepository(FormApplicationQuestion)
    private readonly applicationQuestionRepository: Repository<FormApplicationQuestion>,
    private readonly applicationQuestionOptionsService: FormApplicationQuestionOptionsService,
  ) {
    super(applicationQuestionRepository);
  }

  async createQuestionSnapshotInTransaction(
    savedApplicationId: number,
    savedAppTopicId: number,
    question: FormQuestion,
    manager: EntityManager
  ): Promise<FormApplicationQuestion> {

    const newAppQuestion = manager.create(FormApplicationQuestion, {
      application_id: savedApplicationId,
      application_topic_id: savedAppTopicId,
      base_question_id: question.id,
      title: question.title,
      description: question.description,
      type: question.type,
      order: question.order,
    });

    const savedAppQuestion = await manager.save(newAppQuestion);
    savedAppQuestion.options = [];

    for (const option of question.options) {
      const savedAppQuestionOption = await this.applicationQuestionOptionsService.createQuestionOptionSnapshotInTransaction(
        savedAppQuestion.id,
        option,
        manager
      );

      savedAppQuestion.options.push(savedAppQuestionOption);
    }

    return savedAppQuestion;
  }
}
