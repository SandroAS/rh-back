import { FormQuestionOption } from '@/entities/form-question-option.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormQuestionsModule } from '../form-questions/form-questions.module';
import { FormQuestionOptionsController } from './form-question-options.controller';
import { FormQuestionOptionsService } from './form-question-options.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FormQuestionOption]),
    FormQuestionsModule,
  ],
  controllers: [FormQuestionOptionsController],
  providers: [FormQuestionOptionsService],
  exports: [FormQuestionOptionsService],
})
export class FormQuestionOptionsModule {}
