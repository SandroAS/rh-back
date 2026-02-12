import { EvaluationApplication } from '@/entities/evaluation-application.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EvaluationsModule } from '../evaluations/evaluations.module';
import { FormApplicationsModule } from '../form-applications/form-applications.module';
import { EvaluationApplicationsController } from './evaluation-applications.controller';
import { EvaluationApplicationsService } from './evaluation-applications.service';
import { NotificationsModule } from '../notifications/notifications.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([EvaluationApplication]),
    EvaluationsModule,
    FormApplicationsModule,
    NotificationsModule,
    UsersModule,
  ],
  controllers: [EvaluationApplicationsController],
  providers: [EvaluationApplicationsService],
  exports: [EvaluationApplicationsService],
})
export class EvaluationApplicationsModule {}
