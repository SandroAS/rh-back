import { FormAnswer } from '@/entities/form-answer.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormAnswersController } from './form-answers.controller';
import { FormAnswersService } from './form-answers.service';
import { FormAnswerMultiOptionsModule } from '../form-answer-multi-options/form-answer-multi-options.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([FormAnswer]),
    FormAnswerMultiOptionsModule,
  ],
  controllers: [FormAnswersController],
  providers: [FormAnswersService],
  exports: [FormAnswersService],
})
export class FormAnswersModule {}
