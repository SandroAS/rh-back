import { Module } from '@nestjs/common';
import { AccountSeedsService } from './account-seeds.service';
import { AccountCreatedListener } from './listeners/account-created.listener';
import { UsersModule } from '../users/users.module';
import { JobPositionsModule } from '../job-positions/job-positions.module';
import { JobPositionsLevelsGroupsModule } from '../job-positions-levels-groups/job-positions-levels-groups.module';
import { SectorsModule } from '../sectors/sectors.module';
import { DrdsModule } from '../drds/drds.module';
import { JobPositionsSeed } from '@/seeds/job-positions.seed';
import { JobLevelsGroupsSeed } from '@/seeds/job-levels-groups.seed';
import { SectorsSeed } from '@/seeds/sectors.seed';
import { DRDsSeed } from '@/seeds/drds.seed';
import { EvaluationSeeder } from '@/seeds/evaluation.seed';
import { EvaluationsModule } from '../evaluations/evaluations.module';
import { CareerPlansSeed } from '@/seeds/career-plans.seed';
import { CareerPlansModule } from '../career-plans/career-plans.module';

@Module({
  imports: [
    UsersModule,
    JobPositionsModule,
    CareerPlansModule,
    JobPositionsLevelsGroupsModule,
    SectorsModule,
    DrdsModule,
    EvaluationsModule,
  ],
  providers: [
    AccountSeedsService, 
    AccountCreatedListener,
    JobPositionsSeed,
    JobLevelsGroupsSeed,
    SectorsSeed,
    DRDsSeed,
    EvaluationSeeder,
    CareerPlansSeed,
  ],
  exports: [AccountSeedsService]
})
export class AccountSeedsModule {}
