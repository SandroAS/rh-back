import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { FormApplicationTopic } from '@/entities/form-application-topic.entity';
import { BaseService } from '@/common/services/base.service';
import { FormTopic } from '@/entities/form-topic.entity';
import { FormApplicationQuestionsService } from '../form-application-questions/form-application-questions.service';

@Injectable()
export class FormApplicationTopicsService extends BaseService<FormApplicationTopic> {
  constructor(
    @InjectRepository(FormApplicationTopic)
    private readonly applicationTopicRepository: Repository<FormApplicationTopic>,
    private readonly formApplicationQuestionsService: FormApplicationQuestionsService,
  ) {
    super(applicationTopicRepository);
  }

  /**
   * Busca um FormApplicationTopic pelo UUID, carregando as perguntas aninhadas.
   */
  async findOneWithQuestions(uuid: string, accountId?: number): Promise<FormApplicationTopic> {
    const qb = this.applicationTopicRepository.createQueryBuilder('topic')
      .where('topic.uuid = :uuid', { uuid })
      
      .leftJoinAndSelect('topic.questions', 'questions')
      .leftJoinAndSelect('questions.options', 'options')
      
      .orderBy('topic.order', 'ASC')
      .addOrderBy('questions.order', 'ASC');

    if (accountId) {
      qb.leftJoin('topic.application', 'application')
        .andWhere('application.account_id = :accountId', { accountId });
    }

    const topic = await qb.getOne();

    if (!topic) {
      throw new NotFoundException(`Form Application Topic with UUID ${uuid} not found.`);
    }

    return topic;
  }

  async createTopicSnapshotInTransaction(
    savedFormApplicationId: number,
    formTopic: FormTopic,
    manager: EntityManager
  ): Promise<FormApplicationTopic> {

    const newAppTopic = manager.create(FormApplicationTopic, {
      form_application_id: savedFormApplicationId,
      base_form_topic_id: formTopic.id,
      drd_topic_id: formTopic.drdTopic.id,
      title: formTopic.title,
      description: formTopic.description,
      order: formTopic.order,
    });

    const savedAppTopic = await manager.save(newAppTopic);
    savedAppTopic.questions = [];

    for (const question of formTopic.questions) {
      const savedAppQuestion = await this.formApplicationQuestionsService.createQuestionSnapshotInTransaction(
        savedFormApplicationId,
        savedAppTopic.id,
        question,
        manager
      );
      savedAppTopic.questions.push(savedAppQuestion);
    }

    return savedAppTopic;
  }
}
