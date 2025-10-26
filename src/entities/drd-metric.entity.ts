import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../common/entities/base.entity';
import { DRD } from './drd.entity'
import { DRDLevelMinScore } from './drd-level-min-score.entity';

export enum MetricType {
    PERCENTAGE = 'PERCENTAGE',
    QUANTITY = 'QUANTITY',
    DURATION_MONTHS = 'DURATION_MONTHS',
    DURATION_WEEKS = 'DURATION_WEEKS',
    DURATION_DAYS = 'DURATION_DAYS',
    DURATION_HOURS = 'DURATION_HOURS',
    DURATION_MINUTES = 'DURATION_MINUTES',
}

export enum MetricPrefix {
    MAIOR_OU_IGUAL = '>=',
    MENOR_OU_IGUAL = '<=',
}

@Entity('drd_metrics')
export class DRDMetric extends BaseEntity {
  @Column({ name: 'drd_id' })
  drd_id: number;

  @ManyToOne(() => DRD, (drd) => drd.metrics, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'drd_id' })
  drd: DRD;

  @Column({ type: 'int' })
  order: number;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  classification: string;

  @Column({ type: 'enum', enum: MetricType, nullable: false })
  type: MetricType;

  @Column({ type: 'enum', enum: MetricPrefix, nullable: false })
  prefix: MetricPrefix;

  @OneToMany(() => DRDLevelMinScore, (score) => score.drdMetric)
  minScores: DRDLevelMinScore[];
}
