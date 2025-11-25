import { FormApplicationQuestionOption } from '@/entities/form-application-question-option.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormApplicationQuestionOptionsController } from './form-application-question-options.controller';
import { FormApplicationQuestionOptionsService } from './form-application-question-options.service';

@Module({
  imports: [TypeOrmModule.forFeature([FormApplicationQuestionOption])],
  controllers: [FormApplicationQuestionOptionsController],
  providers: [FormApplicationQuestionOptionsService],
  exports: [FormApplicationQuestionOptionsService],
})
export class FormApplicationQuestionOptionsModule {}
