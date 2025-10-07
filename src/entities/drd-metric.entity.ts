import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../common/entities/base.entity';
import { DRD } from './drd.entity'

@Entity('drd_metrics')
export class DRDMetrics extends BaseEntity {
  @Column({ name: 'drd_id' })
  drd_id: number;

  @ManyToOne(() => DRD, (drd) => drd.metrics, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'drd_id' })
  drd: DRD;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  classification: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  type: string;
}
