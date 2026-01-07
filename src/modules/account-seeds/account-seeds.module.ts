import { Module } from '@nestjs/common';
import { AccountSeedsService } from './account-seeds.service';
import { JobPositionsModule } from '../job-positions/job-positions.module';
import { AccountCreatedListener } from './listeners/account-created.listener';

@Module({
  imports: [
    JobPositionsModule, 
  ],
  providers: [AccountSeedsService, AccountCreatedListener],
  exports: [AccountSeedsService]
})
export class AccountSeedsModule {}
