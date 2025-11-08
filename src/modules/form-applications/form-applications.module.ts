import { FormApplication } from '@/entities/form-application.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormsModule } from '../forms/forms.module';
import { FormApplicationsController } from './form-applications.controller';
import { FormApplicationsService } from './form-applications.service';
import { FormQuestionsModule } from '../form-questions/form-questions.module';
import { FormQuestionOptionsModule } from '../form-question-options/form-question-options.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([FormApplication]),
    FormsModule,
    FormQuestionsModule,
    FormQuestionOptionsModule
  ],
  controllers: [FormApplicationsController],
  providers: [FormApplicationsService],
  exports: [FormApplicationsService],
})
export class FormApplicationsModule {}
