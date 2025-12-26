import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from '@/entities/notification.entity';
import { CreateNotificationDto } from './dtos/create-notification.dto';
import { UpdateNotificationDto } from './dtos/update-notification.dto';
import { BaseService, PaginationResult } from '@/common/services/base.service';
import { PaginationDto } from '@/common/dtos/pagination.dto';

@Injectable()
export class NotificationsService extends BaseService<Notification> {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
  ) {
    super(notificationRepository);
  }

  async findAllByUser(userId: number, accountId: number, showHidden = false) {
    return await super.findAll({
      where: { 
        user_id: userId, 
        account_id: accountId,
        is_hidden: showHidden 
      },
      order: { created_at: 'DESC' },
      relations: ['evaluationApplication'],
    });
  }

  async findAndPaginateByUserId(
    pagination: PaginationDto,
    userId: number,
    searchColumns: string[] = ['template_key']
  ): Promise<PaginationResult<Notification>> {
    return super.findAndPaginate(pagination, searchColumns, (qb) => {
      qb.andWhere('entity.user_id = :userId', { userId });
      qb.andWhere('entity.is_hidden = :isHidden', { isHidden: false });
      qb.leftJoin('entity.evaluationApplication', 'evaluationApplication')
        .leftJoin('evaluationApplication.evaluation', 'evaluation')
        .leftJoin('entity.user', 'user');
      qb.select([
        'entity',
        'evaluationApplication.uuid',
        'evaluation.uuid',
        'evaluation.name',
        'user.uuid',
      ]);
      qb.orderBy('entity.created_at', 'DESC');
    });
  }

  async markAllAsRead(userId: number, accountId: number): Promise<void> {
    try {
      await this.notificationRepository.update({ user_id: userId, account_id: accountId }, { viewed_at: new Date() });
    } catch (error) {
      console.error('Erro ao marcar todas as notificações como lidas:', error);
      throw new InternalServerErrorException('Erro ao marcar todas as notificações como lidas');
    }
  }

  async markAsViewed(uuid: string): Promise<Notification> {
    const notification = await super.findByUuid(uuid);
    if (!notification) throw new NotFoundException('Notificação não encontrada');
    
    notification.viewed_at = new Date();
    return await super.update(notification.id, notification);
  }

  async hideNotification(uuid: string): Promise<void> {
    await super.updateByUuid(uuid, { is_hidden: true });
  }
}
