import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { FormQuestionOption } from '@/entities/form-question-option.entity';
import { CreateFormQuestionOptionDto } from './dtos/create-form-question-option.dto';
import { UpdateFormQuestionOptionDto } from './dtos/update-form-question-option.dto';

@Injectable()
export class FormQuestionOptionsService {
  constructor(
    @InjectRepository(FormQuestionOption)
    private formQuestionOptionRepository: Repository<FormQuestionOption>,
  ) {}

  /**
   * Cria múltiplas Opções de Resposta para uma Questão em uma transação.
   * @param questionId ID da Questão pai.
   * @param createOptionDtos Lista de DTOs das opções a serem criadas.
   * @param manager EntityManager da transação pai.
   */
  async createOptionsInTransaction(
    questionId: number,
    createOptionDtos: CreateFormQuestionOptionDto[],
    manager: EntityManager,
  ): Promise<FormQuestionOption[]> {
    try {
      const optionsToCreate = createOptionDtos.map(optionDto => 
        this.formQuestionOptionRepository.create({
          ...optionDto,
          question_id: questionId,
        })
      );

      const savedOptions = await manager.save(FormQuestionOption, optionsToCreate);
      return savedOptions;

    } catch (err) {
      console.error('Erro ao criar Opções de Resposta:', err);
      throw new InternalServerErrorException('Falha ao salvar as opções de resposta da questão.');
    }
  }

  /**
   * Sincroniza a lista de Opções de Resposta de uma Questão (Cria, Atualiza, Remove).
   * @param questionId ID da Questão pai.
   * @param newOptionDtos Dados atualizados/novos das opções.
   * @param existingOptions Opções atualmente ligadas à questão.
   * @param manager EntityManager da transação.
   */
  async syncOptionsInTransaction(
    questionId: number,
    newOptionDtos: UpdateFormQuestionOptionDto[],
    existingOptions: FormQuestionOption[],
    manager: EntityManager,
  ): Promise<FormQuestionOption[]> {
    const optionsToSave: FormQuestionOption[] = [];
    const existingUuids = existingOptions.map(option => option.uuid);
    const newUuids = newOptionDtos.map(option => option.uuid).filter(uuid => uuid);

    try {
      const uuidsToRemove = existingUuids.filter(uuid => !newUuids.includes(uuid));
      if (uuidsToRemove.length > 0) {
        await manager.delete(FormQuestionOption, { question_id: questionId, uuid: { $in: uuidsToRemove } });
      }

      for (const optionDto of newOptionDtos) {
        let optionToSync: FormQuestionOption;

        if (optionDto.uuid) {
          // ATUALIZAR
          optionToSync = existingOptions.find(o => o.uuid === optionDto.uuid);
          if (!optionToSync) {
            throw new NotFoundException(`Opção com UUID ${optionDto.uuid} não encontrada para atualização.`);
          }
          manager.merge(FormQuestionOption, optionToSync, optionDto);
        } else {
          // CRIAR NOVO
          optionToSync = this.formQuestionOptionRepository.create({
            ...optionDto,
            question_id: questionId
          });
        }

        const savedOption = await manager.save(FormQuestionOption, optionToSync);
        optionsToSave.push(savedOption);
      }
      
      return optionsToSave;

    } catch (err) {
      if (err instanceof NotFoundException) throw err;
      console.error('Erro ao sincronizar Opções de Resposta:', err);
      throw new InternalServerErrorException('Falha ao sincronizar as opções de resposta.');
    }
  }
}
