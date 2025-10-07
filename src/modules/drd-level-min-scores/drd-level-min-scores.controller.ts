import { Controller, Get, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { DrdLevelMinScoresService } from './drd-level-min-scores.service';
import { DRDLevelMinScore } from '@/entities/drd-level-min-score.entity';
import { AccountId } from '@/common/decorators/account-id.decorator';

@Controller('drd-min-scores')
@UsePipes(new ValidationPipe({ transform: true }))
export class DrdLevelMinScoresController {
  constructor(private readonly drdLevelMinScoresService: DrdLevelMinScoresService) {}

  @Get(':metricId')
  async findScoresByMetricId(
    @Param('metricId') metricId: number,
    @AccountId() accountId: number,
  ): Promise<DRDLevelMinScore[]> {
    return this.drdLevelMinScoresService.findAll({
      relations: ['drdMetric', 'drdMetric.drd'],
      where: { drdMetric: { id: metricId, drd: { account_id: accountId } } as any },
    });
  }
}
