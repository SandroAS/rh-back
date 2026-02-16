import { Module } from '@nestjs/common';
import { CareerPlansController } from './career-plans.controller';
import { CareerPlansService } from './career-plans.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CareerPlan } from '@/entities/career-plan.entity';
import { CareerPlanJobPosition } from '@/entities/career-plan-job-position.entity';
import { JobPosition } from '@/entities/job-position.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CareerPlan, CareerPlanJobPosition, JobPosition]),
  ],
  controllers: [CareerPlansController],
  providers: [CareerPlansService],
  exports: [CareerPlansService],
})
export class CareerPlansModule {}
