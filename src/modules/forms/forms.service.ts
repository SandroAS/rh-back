import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Form, FormStatus } from '@/entities/form.entity';
import { CreateFormDto } from './dtos/create-form.dto';
import { UpdateFormDto } from './dtos/update-form.dto';
import { FormTopicsService } from '../form-topics/form-topics.service';
import { BaseService } from '@/common/services/base.service';

@Injectable()
export class FormsService extends BaseService<Form> {
  constructor(
    @InjectRepository(Form)
    private formRepository: Repository<Form>,
    private formTopicsService: FormTopicsService,
  ) {
    super(formRepository);
  }

  /**
   * Cria um novo Formulário, seus Tópicos, Questões e Opções dentro de uma transação.
   * @param createFormDto Dados para criação do Form e sua estrutura aninhada.
   * @param manager EntityManager da transação pai (do EvaluationsService).
   * @returns O Form recém-criado.
   */
  async createInTransaction(
    createFormDto: CreateFormDto,
    manager: EntityManager,
  ): Promise<Form> {
    try {
      const formRepository = manager.getRepository(Form);
      const newFormData = formRepository.create({...createFormDto, status: FormStatus.DRAFT});
      const savedForm = await formRepository.save(newFormData);

      if (createFormDto.topics && createFormDto.topics.length > 0) {
        await this.formTopicsService.createTopicsAndQuestionsInTransaction(
          savedForm.id,
          createFormDto.topics,
          manager,
        );
      }

      return savedForm;

    } catch (err) {
      throw new InternalServerErrorException('Falha ao criar o Formulário e sua estrutura. Erro: '+err);
    }
  }

  /**
   * Sincroniza (cria, atualiza, remove) a estrutura aninhada do Form (Tópicos/Questões).
   * @param formUuid UUID do Form a ser atualizado.
   * @param updateFormDto Dados para atualização.
   * @param accountId ID da conta.
   * @param updatedByUserUuid UUID do usuário que está atualizando.
   * @param manager EntityManager da transação pai.
   * @returns O Form atualizado com a nova estrutura.
   */
  async syncFormStructureInTransaction(
    formUuid: string,
    updateFormDto: UpdateFormDto,
    manager: EntityManager,
  ): Promise<Form> {

    try {
      const existingForm = await manager.findOne(Form, {
        where: { uuid: formUuid },
        relations: [
          'topics', 
          'topics.questions', 
          'topics.questions.options',
          'formQuestions',
          'formQuestions.options',
        ],
      });
  
      if (!existingForm) {
        throw new NotFoundException(`Formulário com UUID ${formUuid} não encontrado para sincronização.`);
      }
  
      const formUpdateData = {
        name: updateFormDto.name,
        description: updateFormDto.description,
      };
  
      manager.merge(Form, existingForm, formUpdateData);
      const updatedForm = await manager.save(Form, existingForm);
      const formId = updatedForm.id;

      if (updateFormDto.topics !== undefined) {
        const updatedTopics = await this.formTopicsService.syncTopicsAndQuestionsInTransaction(
          formId,
          updateFormDto.topics,
          existingForm.topics,
          manager
        );
        updatedForm.topics = updatedTopics;
      }
  
      return updatedForm;

    } catch (err) {
      console.error('Erro ao atualizar Form:', err);
      throw new InternalServerErrorException('Falha ao concluir a atualização do formulário.');
    }
  }
}
