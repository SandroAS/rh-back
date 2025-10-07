// src/drd-topics/drd-topics.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DrdTopicsService } from './drd-topics.service';
import { DrdTopicsController } from './drd-topics.controller';
import { DRDTopic } from '@/entities/drd-topic.entity';
import { DrdTopicItemsModule } from '../drd-topic-items/drd-topic-items.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DRDTopic]),
    DrdTopicItemsModule
  ],
  controllers: [DrdTopicsController],
  providers: [DrdTopicsService],
  exports: [DrdTopicsService], 
})
export class DrdTopicsModule {}
