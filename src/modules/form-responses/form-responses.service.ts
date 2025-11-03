import { FormResponse } from '@/entities/form-response.entity';
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, EntityManager } from 'typeorm';
import { FormApplicationsService } from '../form-applications/form-applications.service';

@Injectable()
export class FormResponsesService {
  constructor(
    @InjectRepository(FormResponse)
    private readonly responseRepository: Repository<FormResponse>,
    private readonly formApplicationService: FormApplicationsService,
    private readonly dataSource: DataSource,
  ) {}

  /**
   * Inicia ou finaliza a submissão de um formulário.
   * Esta lógica deve orquestrar a transação para salvar FormResponse e FormAnswers.
   */
  async submitResponse(applicationUuid: string, data: any): Promise<FormResponse> {

    return this.dataSource.transaction(async (manager: EntityManager) => {

      const newResponse = manager.create(FormResponse, {
          // ... Mapeamento de dados, user_id, is_completed, submitted_at
      });
      const savedResponse = await manager.save(newResponse);
        
      return savedResponse;
    });
  }
}
