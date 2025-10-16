import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../common/entities/base.entity';
import { DRD } from './drd.entity';
import { DRDTopicItem } from './drd-topic-item.entity';

@Entity('drd_topics')
export class DRDTopic extends BaseEntity {
  @Column({ name: 'drd_id', type: 'int' })
  drd_id: number;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'int', default: 0 })
  order: number;

  @ManyToOne(() => DRD, (drd) => drd.topics, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'drd_id' })
  drd: DRD;
  
  @OneToMany(() => DRDTopicItem, (item) => item.drdTopic)
  items: DRDTopicItem[];
}
