import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { FormQuestion } from '@/entities/form-question.entity';
import { CreateFormQuestionDto } from './dtos/create-form-question.dto';
import { UpdateFormQuestionDto } from './dtos/update-form-question.dto';
import { FormQuestionOptionsService } from '../form-question-options/form-question-options.service';

@Injectable()
export class FormQuestionsService {
  constructor(
    @InjectRepository(FormQuestion)
    private formQuestionRepository: Repository<FormQuestion>,
    private formQuestionOptionsService: FormQuestionOptionsService,
  ) {}

  /**
   * Cria múltiplas Questões e suas Opções em uma transação.
   * A questão pode ser ligada a um Form OU a um FormTopic.
   * @param formId ID do Formulário pai (Opcional, para questões diretas).
   * @param createQuestionDtos Lista de DTOs das questões a serem criadas.
   * @param manager EntityManager da transação pai.
   * @param topicId ID do Tópico pai (Opcional, para questões aninhadas em Tópicos).
   */
  async createQuestionsInTransaction(
    formId: number | null,
    createQuestionDtos: CreateFormQuestionDto[],
    manager: EntityManager,
    topicId: number | null = null,
  ): Promise<FormQuestion[]> {
    const savedQuestions: FormQuestion[] = [];

    try {
      for (const questionDto of createQuestionDtos) {
        const newQuestion = this.formQuestionRepository.create({
          ...questionDto,
          form_id: formId,
          topic_id: topicId,
        });

        const savedQuestion = await manager.save(FormQuestion, newQuestion);
        const questionId = savedQuestion.id;

        if (questionDto.options && questionDto.options.length > 0) {
          await this.formQuestionOptionsService.createOptionsInTransaction(
            questionId,
            questionDto.options,
            manager,
          );
        }

        savedQuestions.push(savedQuestion);
      }
      return savedQuestions;

    } catch (err) {
      console.error('Erro ao criar Questões e Opções aninhadas:', err);
      throw new InternalServerErrorException('Falha ao salvar a estrutura de questões do formulário.');
    }
  }

  /**
   * Sincroniza a lista de Questões (Cria, Atualiza, Remove).
   * @param formId ID do Formulário pai (ou null).
   * @param newQuestionDtos Dados atualizados/novos das questões.
   * @param existingQuestions Questões atualmente ligadas ao Form ou Tópico.
   * @param manager EntityManager da transação.
   * @param topicId ID do Tópico pai (ou null).
   */
  async syncQuestionsInTransaction(
    formId: number | null,
    newQuestionDtos: UpdateFormQuestionDto[],
    existingQuestions: FormQuestion[],
    manager: EntityManager,
    topicId: number | null = null,
  ): Promise<FormQuestion[]> {
    const questionsToSave: FormQuestion[] = [];
    const existingUuids = existingQuestions.map(question => question.uuid);
    const newUuids = newQuestionDtos.map(question => question.uuid).filter(uuid => uuid);

    try {
      const uuidsToRemove = existingUuids.filter(uuid => !newUuids.includes(uuid));
      if (uuidsToRemove.length > 0) {
        const whereClause = { 
            uuid: { $in: uuidsToRemove }, 
            ...(formId && { form_id: formId }),
            ...(topicId && { topic_id: topicId })
        };
        await manager.delete(FormQuestion, whereClause);
      }

      for (const questionDto of newQuestionDtos) {
        let questionToSync: FormQuestion;
        const optionsToSync = questionDto.options;

        if (questionDto.uuid) {
          // ATUALIZAR
          questionToSync = existingQuestions.find(q => q.uuid === questionDto.uuid);
          if (!questionToSync) {
            throw new NotFoundException(`Questão com UUID ${questionDto.uuid} não encontrada para atualização.`);
          }
          manager.merge(FormQuestion, questionToSync, questionDto);
        } else {
          // CRIAR NOVO
          questionToSync = this.formQuestionRepository.create({
            ...questionDto, 
            form_id: formId, 
            topic_id: topicId 
          });
        }

        const savedQuestion = await manager.save(FormQuestion, questionToSync);
        
        if (optionsToSync !== undefined) {
          const existingOptions = questionToSync.options || [];
          
          const updatedOptions = await this.formQuestionOptionsService.syncOptionsInTransaction(
              savedQuestion.id,
              optionsToSync,
              existingOptions,
              manager
          );
          savedQuestion.options = updatedOptions;
        }
        
        questionsToSave.push(savedQuestion);
      }
      
      return questionsToSave;

    } catch (err) {
      if (err instanceof NotFoundException) throw err;
      console.error('Erro ao sincronizar Questões do Formulário:', err);
      throw new InternalServerErrorException('Falha ao sincronizar a estrutura de questões.');
    }
  }
}
