import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DrdTopicItemsService } from './drd-topic-items.service';
import { DrdTopicItemsController } from './drd-topic-items.controller';
import { DRDTopicItem } from '@/entities/drd-topic-item.entity';
import { DrdLevelMinScoresModule } from '../drd-level-min-scores/drd-level-min-scores.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DRDTopicItem]),
    DrdLevelMinScoresModule
  ],
  controllers: [DrdTopicItemsController],
  providers: [DrdTopicItemsService],
  exports: [DrdTopicItemsService], 
})
export class DrdTopicItemsModule {}
