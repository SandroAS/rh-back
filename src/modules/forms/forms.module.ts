import { Form } from '@/entities/form.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormsController } from './forms.controller';
import { FormsService } from './forms.service';
import { FormTopicsModule } from '../form-topics/form-topics.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Form]),
    FormTopicsModule
  ],
  controllers: [FormsController],
  providers: [FormsService],
  exports: [FormsService],
})
export class FormsModule {}
