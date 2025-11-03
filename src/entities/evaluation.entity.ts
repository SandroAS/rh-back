import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../common/entities/base.entity';
import { Form } from './form.entity';
import { EvaluationApplication } from './evaluation-application.entity';

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

  @ManyToOne(() => Form, (form) => form.evaluations, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'form_id' })
  form: Form;

  @OneToMany(() => EvaluationApplication, (app) => app.evaluation)
  applications: EvaluationApplication[];
}