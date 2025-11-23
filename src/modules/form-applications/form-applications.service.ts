import { FormApplication } from '@/entities/form-application.entity';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { FormsService } from '../forms/forms.service';
import { FormQuestionsService } from '../form-questions/form-questions.service';
import { FormQuestionOptionsService } from '../form-question-options/form-question-options.service';
import { BaseService } from '@/common/services/base.service';
import { FormApplicationTopic } from '@/entities/form-application-topic.entity';
import { FormApplicationQuestionOption } from '@/entities/form-application-question-option.entity';
import { FormApplicationQuestion } from '@/entities/form-application-question.entity';


@Injectable()
export class FormApplicationsService extends BaseService<FormApplication> {
  constructor(
    @InjectRepository(FormApplication)
    private readonly formApplicationRepository: Repository<FormApplication>,
    private readonly formService: FormsService,
    private readonly questionService: FormQuestionsService,
    private readonly optionService: FormQuestionOptionsService,
  )  {
    super(formApplicationRepository);
  }

  /**
   * CORE: Cria uma cópia imutável (snapshot) de um Form base.
   * Esta lógica complexa será executada dentro de uma transação orquestrada pelo EvaluationService.
   * O FormApplicationService DEVE orquestrar o salvamento dos seus filhos (Questions e Options do Application).
   * * @param formUuid UUID do Form (Template) que será copiado.
   * @param manager EntityManager para garantir atomicidade.
   * @returns O FormApplication (Snapshot) criado.
   */
  async createInTransaction(
    formUuid: string,
    accountId: number,
    createdApplicationId: number,
    manager: EntityManager
  ): Promise<FormApplication> {
    const form = await this.formService.findByUuid(formUuid, {
        relations: ['topics', 'topics.questions', 'topics.questions.options']
    });

    if (!form || !form.topics) {
      throw new BadRequestException(`Formulário base com UUID ${formUuid} não encontrado ou não possui tópicos carregados.`);
    }

    const newApplication = manager.create(FormApplication, {
      base_form_id: form.id,
      name: form.name,
      description: form.description,
    });
    const savedApplication = await manager.save(newApplication);

    for (const topic of form.topics) {
      const newAppTopic = manager.create(FormApplicationTopic, {
        application_id: savedApplication.id,
        base_topic_id: topic.id,
        name: topic.title,
        order: topic.order,
      });
      const savedAppTopic = await manager.save(newAppTopic);

      for (const question of topic.questions) {
        const newAppQuestion = manager.create(FormApplicationQuestion, {
          application_id: savedApplication.id,
          application_topic_id: savedAppTopic.id,
          base_question_id: question.id,
          title: question.title,
          description: question.description,
          type: question.type,
          order: question.order,
        });
        const savedAppQuestion = await manager.save(newAppQuestion);

        for (const option of question.options) {
          const newAppOption = manager.create(FormApplicationQuestionOption, {
            application_question_id: savedAppQuestion.id,
            base_option_id: option.id,
            text: option.text,
            order: option.order,
          });
          await manager.save(newAppOption);
        }
      }
    }
    // CONTINUAR TRABALHANDO PARA FAZER FUNCIONAR O FLUXO DE CRIAR APLICACOES
    return savedApplication;
  }
}
