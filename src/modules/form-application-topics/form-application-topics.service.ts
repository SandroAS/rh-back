import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FormApplicationTopic } from '@/entities/form-application-topic.entity';
import { BaseService } from '@/common/services/base.service';

@Injectable()
export class FormApplicationTopicsService extends BaseService<FormApplicationTopic> {
  constructor(
    @InjectRepository(FormApplicationTopic)
    private readonly applicationTopicRepository: Repository<FormApplicationTopic>,
  ) {
    super(applicationTopicRepository);
  }

  /**
   * Busca um FormApplicationTopic pelo UUID, carregando as perguntas aninhadas.
   * Não é necessário o accountId, pois o UUID já é único, mas é boa prática ter um filtro de segurança.
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
}