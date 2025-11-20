import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormTopicsController } from './form-topics.controller';
import { FormTopicsService } from './form-topics.service';
import { FormTopic } from '@/entities/form-topic.entity';
import { FormQuestionsModule } from '../form-questions/form-questions.module';
import { DrdTopicsModule } from '../drd-topics/drd-topics.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([FormTopic]),
    FormQuestionsModule,
    DrdTopicsModule
  ],
  controllers: [FormTopicsController],
  providers: [FormTopicsService],
  exports: [FormTopicsService],
})
export class FormTopicsModule {}
