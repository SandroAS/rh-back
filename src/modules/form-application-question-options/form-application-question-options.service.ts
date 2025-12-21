import { BaseService } from '@/common/services/base.service';
import { FormApplicationQuestionOption } from '@/entities/form-application-question-option.entity';
import { FormQuestionOption } from '@/entities/form-question-option.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class FormApplicationQuestionOptionsService extends BaseService<FormApplicationQuestionOption> {
  constructor(
    @InjectRepository(FormApplicationQuestionOption)
    private readonly applicationQuestionOptionsRepository: Repository<FormApplicationQuestionOption>,
  ) {
    super(applicationQuestionOptionsRepository);
  }

  async createQuestionOptionSnapshotInTransaction(
    savedFormApplicationQuestionId: number,
    option: FormQuestionOption,
    manager: EntityManager
  ): Promise<FormApplicationQuestionOption> {
    const newAppOption = manager.create(FormApplicationQuestionOption, {
      application_question_id: savedFormApplicationQuestionId,
      base_option_id: option.id,
      text: option.text,
      order: option.order
    });

    return await manager.save(newAppOption);
  }
}
