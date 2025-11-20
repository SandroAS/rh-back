import { FormQuestion } from '@/entities/form-question.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormQuestionsController } from './form-questions.controller';
import { FormQuestionsService } from './form-questions.service';
import { FormQuestionOptionsModule } from '../form-question-options/form-question-options.module';
import { DrdTopicItemsModule } from '../drd-topic-items/drd-topic-items.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([FormQuestion]),
    FormQuestionOptionsModule,
    DrdTopicItemsModule
  ],
  controllers: [FormQuestionsController],
  providers: [FormQuestionsService],
  exports: [FormQuestionsService],
})
export class FormQuestionsModule {}