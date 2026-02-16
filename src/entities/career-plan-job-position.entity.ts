import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../common/entities/base.entity';
import { CareerPlan } from './career-plan.entity';
import { JobPosition } from './job-position.entity';

@Entity('career_plan_job_positions')
export class CareerPlanJobPosition extends BaseEntity {
  @Column({ name: 'career_plan_id' })
  career_plan_id: number;

  @ManyToOne(() => CareerPlan, (careerPlan) => careerPlan.careerPlanJobPositions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'career_plan_id' })
  careerPlan: CareerPlan;

  @Column({ name: 'job_position_id' })
  job_position_id: number;

  @ManyToOne(() => JobPosition, (jobPosition) => jobPosition.careerPlanJobPositions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'job_position_id' })
  jobPosition: JobPosition;

  @Column({ type: 'int', default: 0 })
  order: number;

  @Column({ name: 'career_in_ypsilon', type: 'boolean', default: false })
  career_in_ypsilon: boolean;

  @Column({ name: 'ypsilon_after_order', type: 'int', nullable: true })
  ypsilon_after_order: number | null;
}
