import { Column, Entity, JoinColumn, ManyToOne, Index } from 'typeorm';
import { EvaluationApplication, EvaluationType } from './evaluation-application.entity';
import { User } from './user.entity';
import { BaseEntity } from '../common/entities/base.entity';

export enum NotificationCategory {
  INFO = 'INFO',
  WARNING = 'WARNING',
  URGENT = 'URGENT',
}

export enum NotificationTemplateKey {
  EVALUATION_APPLICATION_PEER = 'EVALUATION_APPLICATION_' + EvaluationType.PEER,
  EVALUATION_APPLICATION_SELF = 'EVALUATION_APPLICATION_' + EvaluationType.SELF,
  EVALUATION_APPLICATION_LEADER = 'EVALUATION_APPLICATION_' + EvaluationType.LEADER,
  EVALUATION_APPLICATION_SUBORDINATE = 'EVALUATION_APPLICATION_' + EvaluationType.SUBORDINATE,
  EVALUATION_APPLICATION_CLIENT = 'EVALUATION_APPLICATION_' + EvaluationType.CLIENT,
  EVALUATION_APPLICATION_OTHER = 'EVALUATION_APPLICATION_' + EvaluationType.OTHER,
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
