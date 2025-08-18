import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobPositionsLevelsController } from './job-positions-levels.controller';
import { JobPositionsLevelsService } from './job-positions-levels.service';
import { JobPositionsLevel } from '@/entities/job-position-level.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JobPositionsLevel])],
  controllers: [JobPositionsLevelsController],
  providers: [JobPositionsLevelsService],
  exports: [JobPositionsLevelsService],
})
export class JobPositionsLevelsModule {}
