import { FormApplicationQuestion } from '@/entities/form-application-question.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormApplicationQuestionsController } from './form-application-questions.controller';
import { FormApplicationQuestionsService } from './form-application-questions.service';
import { FormApplicationQuestionOptionsModule } from '../form-application-question-options/form-application-question-options.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([FormApplicationQuestion]),
    FormApplicationQuestionOptionsModule,
  ],
  controllers: [FormApplicationQuestionsController],
  providers: [FormApplicationQuestionsService],
  exports: [FormApplicationQuestionsService],
})
export class FormApplicationQuestionsModule {}
