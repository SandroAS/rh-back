import { Entity, Column, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { BaseEntity } from '../common/entities/base.entity';
import { DRDTopicItem } from './drd-topic-item.entity';
import { DRDLevel } from './drd-level.entity';
import { DRDMetrics } from './drd-metric.entity';

@Entity('drd_level_min_scores')
@Unique(['drd_topic_item_id', 'drd_level_id'])
export class DRDLevelMinScore extends BaseEntity {
  @Column({ name: 'drd_level_id', type: 'int' })
  drd_level_id: number;
  
  @Column({ name: 'drd_topic_item_id', type: 'int', nullable: true })
  drd_topic_item_id: number;

  @Column({ name: 'drd_metric_id', type: 'int', nullable: true })
  drd_metric_id: number;

  @Column({ name: 'min_score', type: 'int', default: 0, unsigned: true })
  min_score: number;

  @ManyToOne(() => DRDMetrics, (metric) => metric.minScores, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'drd_metric_id' })
  drdMetric: DRDMetrics;

  @ManyToOne(() => DRDTopicItem, (item) => item.minScores, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'drd_topic_item_id' })
  drdTopicItem: DRDTopicItem;
  
  @ManyToOne(() => DRDLevel, (level) => level.minScores, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'drd_level_id' })
  drdLevel: DRDLevel;
}
