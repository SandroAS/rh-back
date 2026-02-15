import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '@/entities/account.entity';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { SystemModulesModule } from '../system-modules/system-modules.module';
import { MinioModule } from '@/minio/minio.module';
import { UsersModule } from '../users/users.module';
import { RolesModule } from '../roles/roles.module';
import { JobPositionsModule } from '../job-positions/job-positions.module';
import { JobPositionsLevelsModule } from '../job-positions-levels/job-positions-levels.module';
import { SectorsModule } from '../sectors/sectors.module';
import { EvaluationApplicationsModule } from '../evaluation-applications/evaluation-applications.module';
import { FormResponsesModule } from '../form-responses/form-responses.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account]),
    SystemModulesModule,
    MinioModule,
    UsersModule,
    RolesModule,
    JobPositionsModule,
    JobPositionsLevelsModule,
    SectorsModule,
    EvaluationApplicationsModule,
    FormResponsesModule,
  ],
  providers: [AccountsService],
  controllers: [AccountsController],
  exports: [AccountsService],
})
export class AccountsModule {}
