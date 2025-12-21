import { FormApplication } from '@/entities/form-application.entity';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { FormsService } from '../forms/forms.service';
import { BaseService } from '@/common/services/base.service';
import { FormApplicationTopicsService } from '../form-application-topics/form-application-topics.service';
import { Form } from '@/entities/form.entity';

@Injectable()
export class FormApplicationsService extends BaseService<FormApplication> {
  constructor(
    @InjectRepository(FormApplication)
    private readonly formApplicationRepository: Repository<FormApplication>,
    private readonly formService: FormsService,
    private readonly formApplicationTopicsSerivice: FormApplicationTopicsService,
  )  {
    super(formApplicationRepository);
  }

  /**
   * CORE: Cria uma cópia imutável (snapshot) de um Form base.
   * Esta lógica complexa será executada dentro de uma transação orquestrada pelo EvaluationService.
   * O FormApplicationService DEVE orquestrar o salvamento dos seus filhos (Questions e Options do Application).
   * * @param form Form (Template) que será copiado.
   * @param manager EntityManager para garantir atomicidade.
   * @returns O FormApplication (Snapshot) criado.
   */
  async createInTransaction(
    form: Form,
    accountId: number,
    manager: EntityManager
  ): Promise<FormApplication> {

    if (!form || !form.topics) {
      throw new BadRequestException(`Formulário base com UUID ${form.uuid} não encontrado ou não possui tópicos carregados.`);
    }

    const newApplication = manager.create(FormApplication, {
      account_id: accountId,
      base_form_id: form.id,
      name: form.name,
      description: form.description,
    });

    const savedFormApplication = await manager.save(newApplication);
    savedFormApplication.applicationTopics = [];

    for (const topic of form.topics) {
      const savedFormApplicationTopic = await this.formApplicationTopicsSerivice.createTopicSnapshotInTransaction(
        savedFormApplication.id,
        topic,
        manager
      );

      savedFormApplication.applicationTopics.push(savedFormApplicationTopic);
    }

    return savedFormApplication;
  }
}
