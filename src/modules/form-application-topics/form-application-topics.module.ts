import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormApplicationTopic } from '@/entities/form-application-topic.entity';
import { FormApplicationTopicsService } from './form-application-topics.service';
import { FormApplicationTopicsController } from './form-application-topics.controller';
import { FormApplicationQuestionsModule } from '../form-application-questions/form-application-questions.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([FormApplicationTopic]),
    FormApplicationQuestionsModule
  ],
  controllers: [FormApplicationTopicsController],
  providers: [FormApplicationTopicsService],
  exports: [FormApplicationTopicsService], 
})
export class FormApplicationTopicsModule {}
