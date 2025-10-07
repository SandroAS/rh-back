import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../common/entities/base.entity';
import { DRD } from './drd.entity';
import { DRDLevelMinScore } from './drd-level-min-score.entity';

@Entity('drd_levels')
export class DRDLevel extends BaseEntity {
  @Column({ name: 'drd_id', type: 'int' })
  drd_id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'int', default: 0 })
  order: number;

  @ManyToOne(() => DRD, (drd) => drd.levels, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'drd_id' })
  drd: DRD;

  @OneToMany(() => DRDLevelMinScore, (score) => score.drdLevel)
  minScores: DRDLevelMinScore[];
}
