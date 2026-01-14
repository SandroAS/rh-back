import { CreateJobPositionDto } from '@/modules/job-positions/dtos/create-job-position.dto';
import { JobPositionService } from '@/modules/job-positions/job-positions.service';
import { Injectable, Logger } from '@nestjs/common';
import { jobPositionDefinitions } from './jobPositionsData/job-positions-data-definition';

@Injectable()
export class JobPositionsSeed {
  private readonly logger = new Logger(JobPositionsSeed.name);

  constructor(private readonly jobPositionService: JobPositionService) {}

  async run(accountId: number, defaultGroupId: number | null) {
    if (!defaultGroupId) return;

    this.logger.log(`Populando cargos para conta ID: ${accountId}...`);

    const definitionsAsPositions: Partial<CreateJobPositionDto>[] = jobPositionDefinitions.map(d => ({
      title: d.title,
      cbo_code: d.cbo_code,
      base_salary: d.base_salary || 0,
      description: d.description,
    }));

    const genericPositions: Partial<CreateJobPositionDto>[] = [
      // EXEMPLOS DE CARGOS GENÉRICOS
      // { title: 'Analista de Dados', cbo_code: '2112-10', base_salary: 0, description: 'Processamento e visualização estratégica de dados.' },
    ];

    const allPositions = [...definitionsAsPositions, ...genericPositions];

    for (const positionDto of allPositions) {
      try {
        const finalDto = {
          ...positionDto,
          job_positions_levels_group_id: defaultGroupId,
          base_salary: positionDto.base_salary || 0,
        } as CreateJobPositionDto;

        await this.jobPositionService.createWithAccountId(finalDto, accountId);
      } catch (err) {
        if (!err.message.includes('already exists') && !err.message.includes('unique constraint')) {
          this.logger.warn(`Erro no cargo "${positionDto.title}": ${err.message}`);
        }
      }
    }
  }
}
