import { Column, Entity, JoinColumn, ManyToOne, Index } from 'typeorm';
import { EvaluationApplication } from './evaluation-application.entity';
import { User } from './user.entity';
import { BaseEntity } from '../common/entities/base.entity';

export enum NotificationCategory {
  INFO = 'INFO',
  WARNING = 'WARNING',
  URGENT = 'URGENT',
}

@Entity('notifications')
export class Notification extends BaseEntity {
  @Index()
  @Column({ name: 'account_id', type: 'int' })
  account_id: number;

  @Index()
  @Column({ name: 'user_id', type: 'int' })
  user_id: number;

  @ManyToOne(() => User, (user) => user.notifications, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'template_key', type: 'varchar', length: 100 })
  template_key: string;

  @Column({ name: 'category', type: 'varchar', length: 20, default: 'INFO' })
  category: NotificationCategory;

  @Column({ name: 'sent_for_system_at', type: 'timestamp', nullable: true })
  sent_for_system_at: Date;

  @Column({ name: 'sent_for_email_at', type: 'timestamp', nullable: true })
  sent_for_email_at: Date;

  @Column({ name: 'sent_for_wpp_at', type: 'timestamp', nullable: true })
  sent_for_wpp_at: Date;

  @Column({ name: 'viewed_at', type: 'timestamp', nullable: true })
  viewed_at: Date;

  @Column({ name: 'is_hidden', type: 'boolean', default: false })
  is_hidden: boolean;

  @Column({ name: 'redirect_url', type: 'varchar', nullable: true })
  redirect_url: string;

  @Column({ name: 'evaluation_application_id', type: 'int', nullable: true })
  evaluation_application_id: number | null;

  @ManyToOne(() => EvaluationApplication, (evaluationApplication) => evaluationApplication.notifications, { 
    onDelete: 'CASCADE', 
    nullable: true 
  })
  @JoinColumn({ name: 'evaluation_application_id' })
  evaluationApplication: EvaluationApplication | null;
}
