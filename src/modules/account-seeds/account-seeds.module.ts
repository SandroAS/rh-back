import { Module } from '@nestjs/common';
import { AccountSeedsService } from './account-seeds.service';
import { JobPositionsModule } from '../job-positions/job-positions.module';
import { AccountCreatedListener } from './listeners/account-created.listener';
import { UsersModule } from '../users/users.module';
import { JobPositionsLevelsGroupsModule } from '../job-positions-levels-groups/job-positions-levels-groups.module';
import { SectorsModule } from '../sectors/sectors.module';

@Module({
  imports: [
    UsersModule,
    JobPositionsModule,
    JobPositionsLevelsGroupsModule,
    SectorsModule,
  ],
  providers: [AccountSeedsService, AccountCreatedListener],
  exports: [AccountSeedsService]
})
export class AccountSeedsModule {}
