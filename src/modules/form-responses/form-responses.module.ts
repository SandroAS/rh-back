import { FormResponse } from '@/entities/form-response.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormApplicationsModule } from '../form-applications/form-applications.module';
import { FormResponsesController } from './form-responses.controller';
import { FormResponsesService } from './form-responses.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FormResponse]),
    FormApplicationsModule,
  ],
  controllers: [FormResponsesController],
  providers: [FormResponsesService],
  exports: [FormResponsesService],
})
export class FormResponsesModule {}
