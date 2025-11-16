import { Entity, Column, ManyToOne, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from '../common/entities/base.entity';
import { Form } from './form.entity';
import { EvaluationApplication } from './evaluation-application.entity';
import { DRD } from './drd.entity';
import { User } from './user.entity';

@Entity('evaluations')
export class Evaluation extends BaseEntity {
  @Column({ name: 'form_id', type: 'int' })
  form_id: number;

  @Column({ name: 'drd_id', type: 'int', nullable: true })
  drd_id: number | null;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  rate: number;

  @Column({ name: 'account_id', type: 'int' })
  account_id: number;

  @Column({ name: 'created_by_user_id', type: 'int' })
  created_by_user_id: number;

  @OneToOne(() => Form, (form) => form.evaluation)
  @JoinColumn({ name: 'form_id' })
  form: Form;

  @ManyToOne(() => DRD, (drd) => drd.evaluations, { onDelete: 'RESTRICT', nullable: true })
  @JoinColumn({ name: 'drd_id' })
  drd: DRD | null;

  @ManyToOne(() => User, (user) => user.createdEvaluations, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'created_by_user_id' })
  createdBy: User;

  @OneToMany(() => EvaluationApplication, (app) => app.evaluation)
  applications: EvaluationApplication[];
}