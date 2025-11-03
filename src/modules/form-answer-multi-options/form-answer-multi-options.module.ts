import { FormAnswerMultiOption } from '@/entities/form-answer-multi-option.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormAnswerModule } from '../form-answers/form-answers.module';
import { FormAnswerMultiOptionsController } from './form-answer-multi-options.controller';
import { FormAnswerMultiOptionsService } from './form-answer-multi-options.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FormAnswerMultiOption]),
    FormAnswerModule,
  ],
  controllers: [FormAnswerMultiOptionsController],
  providers: [FormAnswerMultiOptionsService],
  exports: [FormAnswerMultiOptionsService],
})
export class FormAnswerMultiOptionsModule {}
