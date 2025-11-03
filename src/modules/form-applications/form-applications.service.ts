import { FormApplication } from '@/entities/form-application.entity';
import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { FormsService } from '../forms/forms.service';
import { FormQuestionsService } from '../form-questions/form-questions.service';
import { FormQuestionOptionsService } from '../form-question-options/form-question-options.service';


@Injectable()
export class FormApplicationsService {
  constructor(
    @InjectRepository(FormApplication)
    private readonly applicationRepository: Repository<FormApplication>,
    private readonly formService: FormsService,
    private readonly questionService: FormQuestionsService,
    private readonly optionService: FormQuestionOptionsService,
  ) {}

  /**
   * CORE: Cria uma cópia imutável (snapshot) de um Form base.
   * Esta lógica complexa será executada dentro de uma transação orquestrada pelo EvaluationService.
   * O FormApplicationService DEVE orquestrar o salvamento dos seus filhos (Questions e Options do Application).
   * * @param formId ID do Form (Template) que será copiado.
   * @param manager EntityManager para garantir atomicidade.
   * @returns O FormApplication (Snapshot) criado.
   */
  // async createSnapshot(formId: number, manager: EntityManager): Promise<FormApplication> {
  //   const form = await this.formService.findTemplateWithAllDetails(formId); 

  //   if (!form) {
  //     throw new BadRequestException(`Formulário base com ID ${formId} não encontrado ou não está pronto.`);
  //   }

  //   const newApplication = manager.create(FormApplication, {
  //     base_form_id: form.id,
  //     name: form.name,
  //     description: form.description,
  //   });
  //   const savedApplication = await manager.save(newApplication);

  //   for (const question of form.questions) {
  //     const newAppQuestion = manager.create('FormApplicationQuestion', {
  //       application_id: savedApplication.id,
  //       base_question_id: question.id,
  //       text: question.text,
  //       type: question.type,
  //       order: question.order,
  //     });
  //     const savedAppQuestion = await manager.save(newAppQuestion);

  //     for (const option of question.options) {
  //       const newAppOption = manager.create('FormApplicationQuestionOption', {
  //         application_question_id: savedAppQuestion.id,
  //         base_option_id: option.id,
  //         text: option.text,
  //         order: option.order,
  //       });
  //       await manager.save(newAppOption);
  //     }
  //   }

  //   return savedApplication;
  // }
}
