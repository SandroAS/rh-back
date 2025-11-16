import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { FormTopic } from '@/entities/form-topic.entity';
import { CreateFormTopicDto } from './dtos/create-form-topic.dto';
import { UpdateFormTopicDto } from './dtos/update-form-topic.dto';
import { FormQuestionsService } from '../form-questions/form-questions.service';

@Injectable()
export class FormTopicsService {
  constructor(
    @InjectRepository(FormTopic)
    private formTopicRepository: Repository<FormTopic>,
    private formQuestionsService: FormQuestionsService,
  ) {}

  /**
   * Cria múltiplos Tópicos e suas Questões aninhadas em uma transação.
   * @param formId ID do Formulário pai.
   * @param createTopicDtos Lista de DTOs dos tópicos a serem criados.
   * @param manager EntityManager da transação pai.
   */
  async createTopicsAndQuestionsInTransaction(
    formId: number,
    createTopicDtos: CreateFormTopicDto[],
    manager: EntityManager,
  ): Promise<FormTopic[]> {
    const savedTopics: FormTopic[] = [];

    try {
      for (const topicDto of createTopicDtos) {
        const newTopic = this.formTopicRepository.create({
          ...topicDto,
          form_id: formId,
        });

        const savedTopic = await manager.save(FormTopic, newTopic);
        const topicId = savedTopic.id;

        if (topicDto.questions && topicDto.questions.length > 0) {
          await this.formQuestionsService.createQuestionsInTransaction(
            formId,
            topicDto.questions,
            manager,
            topicId,
          );
        }

        savedTopics.push(savedTopic);
      }
      return savedTopics;

    } catch (err) {
      console.error('Erro ao criar Tópicos e Questões aninhadas:', err);
      throw new InternalServerErrorException('Falha ao salvar a estrutura de tópicos do formulário.');
    }
  }

  /**
   * Sincroniza a lista de Tópicos de um Form: Cria novos, atualiza existentes e remove os omitidos.
   * Também sincroniza as questões aninhadas em cada tópico.
   * @param formId ID do Formulário pai.
   * @param newTopicDtos Dados atualizados/novos dos tópicos.
   * @param existingTopics Tópicos atualmente ligados ao formulário.
   * @param manager EntityManager da transação.
   */
  async syncTopicsAndQuestionsInTransaction(
    formId: number,
    newTopicDtos: UpdateFormTopicDto[],
    existingTopics: FormTopic[],
    manager: EntityManager,
  ): Promise<FormTopic[]> {
    const topicsToSave: FormTopic[] = [];
    const existingUuids = existingTopics.map(topic => topic.uuid);
    const newUuids = newTopicDtos.map(topic => topic.uuid).filter(uuid => uuid);

    try {
      const uuidsToRemove = existingUuids.filter(uuid => !newUuids.includes(uuid));
      if (uuidsToRemove.length > 0) {
        await manager.delete(FormTopic, { form_id: formId, uuid: { $in: uuidsToRemove } });
      }

      for (const topicDto of newTopicDtos) {
        let topicToSync: FormTopic;
        const questionsToSync = topicDto.questions;

        if (topicDto.uuid) {
          topicToSync = existingTopics.find(t => t.uuid === topicDto.uuid);
          if (!topicToSync) {
            throw new NotFoundException(`Tópico com UUID ${topicDto.uuid} não encontrado para atualização.`);
          }
          manager.merge(FormTopic, topicToSync, topicDto);
        } else {
          topicToSync = this.formTopicRepository.create({ ...topicDto, form_id: formId });
        }

        const savedTopic = await manager.save(FormTopic, topicToSync);

        if (questionsToSync !== undefined) {
          const existingQuestions = topicToSync.questions || [];

          const updatedQuestions = await this.formQuestionsService.syncQuestionsInTransaction(
            null,
            questionsToSync,
            existingQuestions,
            manager,
            savedTopic.id
          );
          savedTopic.questions = updatedQuestions;
        }

        topicsToSave.push(savedTopic);
      }

      return topicsToSave;

    } catch (err) {
      if (err instanceof NotFoundException) throw err;
      console.error('Erro ao sincronizar Tópicos do Formulário:', err);
      throw new InternalServerErrorException('Falha ao sincronizar a estrutura de tópicos do formulário.');
    }
  }
}
