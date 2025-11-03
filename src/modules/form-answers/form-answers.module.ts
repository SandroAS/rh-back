import { FormAnswer } from '@/entities/form-answer.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormResponsesModule } from '../form-responses/form-responses.module';
import { FormAnswersController } from './form-answers.controller';
import { FormAnswersService } from './form-answers.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([FormAnswer]),
    FormResponsesModule,
  ],
  controllers: [FormAnswersController],
  providers: [FormAnswersService],
  exports: [FormAnswersService],
})
export class FormAnswerModule {}
