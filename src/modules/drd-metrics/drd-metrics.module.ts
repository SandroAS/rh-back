import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DrdMetricsService } from './drd-metrics.service';
import { DrdMetricsController } from './drd-metrics.controller';
import { DRDMetrics } from '@/entities/drd-metric.entity';
import { DrdLevelMinScoresModule } from '../drd-level-min-scores/drd-level-min-scores.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DRDMetrics]),
    DrdLevelMinScoresModule, 
  ],
  controllers: [DrdMetricsController],
  providers: [DrdMetricsService],
  exports: [DrdMetricsService], 
})
export class DrdMetricsModule {}
