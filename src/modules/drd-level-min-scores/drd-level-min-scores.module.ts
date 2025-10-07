import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DrdLevelMinScoresService } from './drd-level-min-scores.service';
import { DrdLevelMinScoresController } from './drd-level-min-scores.controller';
import { DRDLevelMinScore } from '@/entities/drd-level-min-score.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DRDLevelMinScore])],
  controllers: [DrdLevelMinScoresController],
  providers: [DrdLevelMinScoresService],
  exports: [DrdLevelMinScoresService], 
})
export class DrdLevelMinScoresModule {}
