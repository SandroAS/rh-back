import { FormQuestionOption } from '@/entities/form-question-option.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormQuestionOptionsController } from './form-question-options.controller';
import { FormQuestionOptionsService } from './form-question-options.service';

@Module({
  imports: [TypeOrmModule.forFeature([FormQuestionOption])],
  controllers: [FormQuestionOptionsController],
  providers: [FormQuestionOptionsService],
  exports: [FormQuestionOptionsService],
})
export class FormQuestionOptionsModule {}
