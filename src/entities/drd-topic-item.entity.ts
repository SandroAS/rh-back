import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../common/entities/base.entity';
import { DRDTopic } from './drd-topic.entity';
import { DRDLevelMinScore } from './drd-level-min-score.entity';

@Entity('drd_topic_items')
export class DRDTopicItem extends BaseEntity {
  @Column({ name: 'drd_topic_id', type: 'int' })
  drd_topic_id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(() => DRDTopic, (topic) => topic.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'drd_topic_id' })
  drdTopic: DRDTopic;

  @OneToMany(() => DRDLevelMinScore, (score) => score.drdTopicItem)
  minScores: DRDLevelMinScore[];
}
