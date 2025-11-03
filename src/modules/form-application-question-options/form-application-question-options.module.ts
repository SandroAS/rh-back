import { FormApplicationQuestionOption } from '@/entities/form-application-question-option.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormApplicationQuestionsModule } from '../form-application-questions/form-application-questions.module';
import { FormApplicationQuestionOptionsController } from './form-application-question-options.controller';
import { FormApplicationQuestionOptionsService } from './form-application-question-options.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FormApplicationQuestionOption]),
    FormApplicationQuestionsModule,
  ],
  controllers: [FormApplicationQuestionOptionsController],
  providers: [FormApplicationQuestionOptionsService],
  exports: [FormApplicationQuestionOptionsService],
})
export class FormApplicationQuestionOptionsModule {}
