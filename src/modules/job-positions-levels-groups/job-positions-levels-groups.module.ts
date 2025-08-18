import { JobPositionsLevelsGroup } from '@/entities/job-positions-levels-group.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobPositionsLevelsGroupsService } from './job-positions-levels-groups.service';
import { JobPositionsLevelsGroupsController } from './job-positions-levels-groups.controller';


@Module({
  imports: [TypeOrmModule.forFeature([JobPositionsLevelsGroup])],
  controllers: [JobPositionsLevelsGroupsController],
  providers: [JobPositionsLevelsGroupsService],
  exports: [JobPositionsLevelsGroupsService],
})
export class JobPositionsLevelsGroupsModule {}
