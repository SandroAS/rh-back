import { EvaluationApplication } from '@/entities/evaluation-application.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EvaluationsModule } from '../evaluations/evaluations.module';
import { FormApplicationsModule } from '../form-applications/form-applications.module';
import { EvaluationApplicationsController } from './evaluation-applications.controller';
import { EvaluationApplicationsService } from './evaluation-applications.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([EvaluationApplication]),
    EvaluationsModule,
    FormApplicationsModule,
  ],
  controllers: [EvaluationApplicationsController],
  providers: [EvaluationApplicationsService],
  exports: [EvaluationApplicationsService],
})
export class EvaluationApplicationsModule {}
