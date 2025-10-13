import { Module } from '@nestjs/common';
import { JobPositionService } from './job-positions.service';
import { JobPositionController } from './job-positions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobPosition } from '@/entities/job-position.entity';
import { JobPositionsLevelsGroupsModule } from '../job-positions-levels-groups/job-positions-levels-groups.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([JobPosition]),
    JobPositionsLevelsGroupsModule
  ],
  controllers: [JobPositionController],
  providers: [JobPositionService],
  exports: [JobPositionService],
})
export class JobPositionsModule {}
