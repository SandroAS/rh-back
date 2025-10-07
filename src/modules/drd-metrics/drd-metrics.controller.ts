import { Controller, Get, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { DrdMetricsService } from './drd-metrics.service';
import { DRDMetrics } from '@/entities/drd-metric.entity';
import { AccountId } from '@/common/decorators/account-id.decorator';

@Controller('drd-metrics')
@UsePipes(new ValidationPipe({ transform: true }))
export class DrdMetricsController {
  constructor(private readonly drdMetricsService: DrdMetricsService) {}

  @Get(':metricUuid')
  async findOneByUuid(@Param('metricUuid') metricUuid: string, @AccountId() accountId: number): Promise<DRDMetrics> {
    const metric = await this.drdMetricsService.findOne({
      where: { uuid: metricUuid, drd: { account_id: accountId } as any },
      relations: ['drd', 'minScores'],
    });
    
    if (!metric) {
      throw new Error('Métrica não encontrada ou sem permissão.');
    }

    return metric;
  }
}
