import { FormResponse } from '@/entities/form-response.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormApplicationsModule } from '../form-applications/form-applications.module';
import { FormResponsesController } from './form-responses.controller';
import { FormResponsesService } from './form-responses.service';
import { FormAnswersModule } from '../form-answers/form-answers.module';
import { EvaluationApplicationsModule } from '../evaluation-applications/evaluation-applications.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([FormResponse]),
    FormApplicationsModule,
    FormAnswersModule,
    EvaluationApplicationsModule,
  ],
  controllers: [FormResponsesController],
  providers: [FormResponsesService],
  exports: [FormResponsesService],
})
export class FormResponsesModule {}
