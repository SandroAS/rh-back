import { FormQuestion } from '@/entities/form-question.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormsModule } from '../forms/forms.module';
import { FormQuestionsController } from './form-questions.controller';
import { FormQuestionsService } from './form-questions.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FormQuestion]),
    FormsModule,
  ],
  controllers: [FormQuestionsController],
  providers: [FormQuestionsService],
  exports: [FormQuestionsService],
})
export class FormQuestionsModule {}