import { Controller, Get, Post, Body, Patch, Param, Query, ParseUUIDPipe } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dtos/create-notification.dto';
import { User } from '@/entities/user.entity';
import { AuthUser } from '@/common/decorators/auth-user.decorator';
import { PaginationDto } from '@/common/dtos/pagination.dto';
import { NotificationPaginationResponseDto } from './dtos/notification-pagination-response.dto';
import { AccountId } from '@/common/decorators/account-id.decorator';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  async create(@Body() createNotificationDto: CreateNotificationDto) {
    return await this.notificationsService.create(createNotificationDto);
  }

  @Get('user/:userId')
  async findAll(
    @AuthUser() user: User,
    @AccountId() accountId: number,
  ) {
    return await this.notificationsService.findAllByUser(user.id, accountId);
  }

  @Get('pagination')
  async findAndPaginate(
    @Query() pagination: PaginationDto,
    @AuthUser() user: User,
  ): Promise<NotificationPaginationResponseDto> {
    const result = await this.notificationsService.findAndPaginateByUserId(pagination, user.id);
    return new NotificationPaginationResponseDto(result);
  }

  @Patch(':uuid/view')
  async markAsViewed(@Param('uuid') uuid: string) {
    return await this.notificationsService.markAsViewed(uuid);
  }

  @Patch(':id/hide')
  async hide(@Param('id') id: string) {
    return await this.notificationsService.hideNotification(id);
  }
}
