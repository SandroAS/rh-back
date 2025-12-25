import { NotificationCategory } from '@/entities/notification.entity';
import { IsUUID, IsString, IsEnum, IsOptional, IsUrl } from 'class-validator';

export class CreateNotificationDto {
  @IsUUID()
  accountId: string;

  @IsUUID()
  userId: string;

  @IsString()
  template_key: string;

  @IsEnum(NotificationCategory)
  @IsOptional()
  category?: NotificationCategory;

  @IsOptional()
  @IsUrl()
  redirect_url?: string;

  @IsOptional()
  @IsUUID()
  evaluationApplicationId?: string;
}
