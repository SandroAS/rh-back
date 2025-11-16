import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EvaluationsService } from './evaluations.service';
import { EvaluationsController } from './evaluations.controller';
import { Evaluation } from '@/entities/evaluation.entity';
import { FormsModule } from '../forms/forms.module';
import { DrdsModule } from '../drds/drds.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Evaluation]),
    FormsModule,
    DrdsModule
  ],
  controllers: [EvaluationsController],
  providers: [EvaluationsService],
  exports: [EvaluationsService],
})
export class EvaluationsModule {}
