import { EvaluationApplication } from '@/entities/evaluation-application.entity';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, EntityManager } from 'typeorm';
import { EvaluationsService } from '../evaluations/evaluations.service';
import { FormApplicationsService } from '../form-applications/form-applications.service';

@Injectable()
export class EvaluationApplicationsService {
  constructor(
    @InjectRepository(EvaluationApplication)
    private readonly repository: Repository<EvaluationApplication>,
    private readonly evaluationService: EvaluationsService,
    private readonly formApplicationService: FormApplicationsService,
    private readonly dataSource: DataSource,
  ) {}

  /**
   * CORE: Inicia um novo ciclo de avaliação, criando o Snapshot imutável.
   */
  // async createApplicationCycle(data: any): Promise<EvaluationApplication> {
  //   const { evaluation_id, form_id, ...cycleData } = data; // evaluation_id é o ID da base

  //   if (!evaluation_id || !form_id) {
  //     throw new BadRequestException('ID da avaliação (evaluation_id) e do formulário (form_id) são obrigatórios.');
  //   }

  //   return this.dataSource.transaction(async (manager: EntityManager) => {
  //     const formApplication = await this.formApplicationService.createSnapshot(form_id, manager);

  //     const newEvaluationApp = manager.create(EvaluationApplication, {
  //       ...cycleData,
  //       evaluation_id: evaluation_id, 
  //       form_application_id: formApplication.id,
  //     });

  //     return manager.save(newEvaluationApp);
  //   });
  // }
}