import { JobPositionsLevelsGroup } from '@/entities/job-positions-levels-group.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobPositionsLevelsGroupsService } from './job-positions-levels-groups.service';
import { JobPositionsLevelsGroupsController } from './job-positions-levels-groups.controller';
import { JobPositionsLevelsModule } from '../job-positions-levels/job-positions-levels.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([JobPositionsLevelsGroup]),
    JobPositionsLevelsModule
  ],
  controllers: [JobPositionsLevelsGroupsController],
  providers: [JobPositionsLevelsGroupsService],
  exports: [JobPositionsLevelsGroupsService],
})
export class JobPositionsLevelsGroupsModule {}
