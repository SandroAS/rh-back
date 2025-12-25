import { Expose, Type } from 'class-transformer';
import { NotificationResponseDto } from './notification-response.dto';
import { Notification } from '@/entities/notification.entity';

export class NotificationPaginationResponseDto {
  @Expose()
  total: number;

  @Expose()
  page: number;

  @Expose()
  last_page: number;

  @Expose()
  limit: number;

  @Expose()
  @Type(() => NotificationResponseDto)
  data: NotificationResponseDto[];

  constructor(notificationPagination: { 
    data: Notification[], 
    total: number, 
    page: number, 
    last_page: number, 
    limit: number 
  }) {
    this.total = notificationPagination.total;
    this.page = notificationPagination.page;
    this.last_page = notificationPagination.last_page;
    this.limit = notificationPagination.limit;
    this.data = [];

    if (notificationPagination.data && notificationPagination.data.length > 0) {
      this.data = notificationPagination.data.map(
        (notification: Notification) => new NotificationResponseDto(notification)
      );
    }
  }
}
