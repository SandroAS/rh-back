import { Notification, NotificationCategory } from '@/entities/notification.entity';
import { EvaluationApplicationResponseDto } from '@/modules/evaluation-applications/dtos/evaluation-application-response.dto';
import { UserAvatarResponseDto } from '@/modules/users/dtos/user-avatar-response.dto';
import { Expose, Type } from 'class-transformer';

export class NotificationResponseDto {
  @Expose()
  readonly uuid: string;

  @Expose()
  readonly template_key: string;

  @Expose()
  readonly category: NotificationCategory;

  @Expose()
  readonly sent_for_system_at: Date | null;

  @Expose()
  readonly sent_for_email_at: Date | null;

  @Expose()
  readonly sent_for_wpp_at: Date | null;

  @Expose()
  readonly viewed_at: Date | null;

  @Expose()
  readonly is_hidden: boolean;

  @Expose()
  readonly redirect_url: string | null;

  @Expose()
  readonly user_uuid: string;

  @Expose()
  readonly evaluation_application_uuid: string | null;

  @Expose()
  @Type(() => UserAvatarResponseDto)
  readonly user: UserAvatarResponseDto;

  @Expose()
  @Type(() => EvaluationApplicationResponseDto)
  readonly evaluation_application: EvaluationApplicationResponseDto;

  constructor(notification: Notification) {
    this.uuid = notification.uuid;
    this.template_key = notification.template_key;
    this.category = notification.category;
    this.sent_for_system_at = notification.sent_for_system_at;
    this.sent_for_email_at = notification.sent_for_email_at;
    this.sent_for_wpp_at = notification.sent_for_wpp_at;
    this.viewed_at = notification.viewed_at;
    this.is_hidden = notification.is_hidden;
    this.redirect_url = notification.redirect_url;

    if (notification.user) {
      this.user = new UserAvatarResponseDto(notification.user);
      this.user_uuid = notification.user.uuid;
    }

    if (notification.evaluationApplication) {
      this.evaluation_application = new EvaluationApplicationResponseDto(notification.evaluationApplication);
      this.evaluation_application_uuid = notification.evaluationApplication.uuid;
    }
  }
}
