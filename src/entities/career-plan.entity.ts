import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../common/entities/base.entity';
import { CareerPlanJobPosition } from './career-plan-job-position.entity';

@Entity('career_plans')
export class CareerPlan extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @OneToMany(
    () => CareerPlanJobPosition,
    (careerPlanJobPosition) => careerPlanJobPosition.careerPlan,
    { cascade: true },
  )
  careerPlanJobPositions: CareerPlanJobPosition[];
}
