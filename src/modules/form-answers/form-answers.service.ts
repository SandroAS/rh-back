import { FormAnswer } from '@/entities/form-answer.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { FormResponsesService } from '../form-responses/form-responses.service';
// import { FormAnswerMultiOptionService } from '../form-answer-multi-option/form-answer-multi-option.service'; // Serviço ainda a ser criado

@Injectable()
export class FormAnswersService {
  constructor(
    @InjectRepository(FormAnswer)
    private readonly answerRepository: Repository<FormAnswer>,
    private readonly formResponseService: FormResponsesService,
    // private readonly multiOptionService: FormAnswerMultiOptionService,
  ) {}

  /**
   * Salva as respostas detalhadas para um envio (FormResponse) específico.
   * @param responseId ID do FormResponse pai.
   * @param answersData Array de respostas.
   * @param manager EntityManager da transação pai.
   */
  async saveAnswers(responseId: number, answersData: any[], manager: EntityManager): Promise<FormAnswer[]> {
    // Lógica para iterar sobre answersData e salvar FormAnswer
    // Se for MULTI_CHOICE, delega o salvamento das opções para o FormAnswerMultiOptionService
    // ...
    return [];
  }
}
