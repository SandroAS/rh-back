import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../common/entities/base.entity';
import { CareerPlanJobPosition } from './career-plan-job-position.entity';
import { Account } from './account.entity';

@Entity('career_plans')
export class CareerPlan extends BaseEntity {
  @Column({ name: 'account_id' })
  account_id: number;

  @ManyToOne(() => Account, (account) => account.careerPlans, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'account_id' })
  account: Account;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @OneToMany(
    () => CareerPlanJobPosition,
    (careerPlanJobPosition) => careerPlanJobPosition.careerPlan,
    { cascade: true },
  )
  careerPlanJobPositions: CareerPlanJobPosition[];
}
