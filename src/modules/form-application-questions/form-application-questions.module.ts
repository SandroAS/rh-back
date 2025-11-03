import { FormApplicationQuestion } from '@/entities/form-application-question.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormApplicationsModule } from '../form-applications/form-applications.module';
import { FormApplicationQuestionsController } from './form-application-questions.controller';
import { FormApplicationQuestionsService } from './form-application-questions.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FormApplicationQuestion]),
    FormApplicationsModule,
  ],
  controllers: [FormApplicationQuestionsController],
  providers: [FormApplicationQuestionsService],
  exports: [FormApplicationQuestionsService],
})
export class FormApplicationQuestionsModule {}
