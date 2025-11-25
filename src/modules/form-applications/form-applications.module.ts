import { FormApplication } from '@/entities/form-application.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormsModule } from '../forms/forms.module';
import { FormApplicationsController } from './form-applications.controller';
import { FormApplicationsService } from './form-applications.service';
import { FormApplicationTopicsModule } from '../form-application-topics/form-application-topics.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([FormApplication]),
    FormsModule,
    FormApplicationTopicsModule
  ],
  controllers: [FormApplicationsController],
  providers: [FormApplicationsService],
  exports: [FormApplicationsService],
})
export class FormApplicationsModule {}
