import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormTopicsController } from './form-topics.controller';
import { FormTopicsService } from './form-topics.service';
import { FormTopic } from '@/entities/form-topic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FormTopic])],
  controllers: [FormTopicsController],
  providers: [FormTopicsService],
  exports: [FormTopicsService],
})
export class FormTopicsModule {}
