import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DrdsService } from './drds.service';
import { DrdsController } from './drds.controller';
import { DRD } from '@/entities/drd.entity';
import { JobPositionsModule } from '@/modules/job-positions/job-positions.module'; 
import { UsersModule } from '@/modules/users/users.module'; 
import { DrdMetricsModule } from '../drd-metrics/drd-metrics.module';
import { DrdTopicsModule } from '../drd-topics/drd-topics.module';
import { DrdTopicItemsModule } from '../drd-topic-items/drd-topic-items.module';
import { DrdLevelsModule } from '../drd-levels/drd-levels.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DRD]),
    JobPositionsModule, 
    UsersModule,
    DrdMetricsModule,
    DrdTopicsModule,
    DrdTopicItemsModule,
    DrdLevelsModule
  ],
  controllers: [DrdsController],
  providers: [DrdsService],
  exports: [DrdsService]
})
export class DrdsModule {}
