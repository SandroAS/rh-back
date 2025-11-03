import { FormAnswerMultiOption } from '@/entities/form-answer-multi-option.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';

@Injectable()
export class FormAnswerMultiOptionsService {
  constructor(
    @InjectRepository(FormAnswerMultiOption)
    private readonly repository: Repository<FormAnswerMultiOption>,
  ) {}

  /**
   * Salva as opções selecionadas para uma resposta MULTI_CHOICE específica.
   * @param answerId ID do FormAnswer pai.
   * @param optionIds IDs das opções selecionadas.
   * @param manager EntityManager da transação pai.
   */
  async saveMultiOptions(answerId: number, optionIds: number[], manager: EntityManager) {
    const records = optionIds.map(optionId => manager.create(FormAnswerMultiOption, {
        answer_id: answerId,
        application_option_id: optionId
    }));
    await manager.save(records);
  }
}
