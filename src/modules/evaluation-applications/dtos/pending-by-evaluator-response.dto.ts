import { Expose, Type } from 'class-transformer';
import { UserAvatarResponseDto } from '@/modules/users/dtos/user-avatar-response.dto';
import { PendingEvaluationApplicationItemDto } from './pending-evaluation-application-item.dto';

/**
 * Agrupamento por avaliador: dados do avaliador + aplicações pendentes com datas limite.
 */
export class PendingByEvaluatorResponseDto {
  @Expose()
  @Type(() => UserAvatarResponseDto)
  evaluator: UserAvatarResponseDto;

  @Expose()
  @Type(() => PendingEvaluationApplicationItemDto)
  pending_applications: PendingEvaluationApplicationItemDto[];

  constructor(
    evaluator: UserAvatarResponseDto,
    pending_applications: PendingEvaluationApplicationItemDto[],
  ) {
    this.evaluator = evaluator;
    this.pending_applications = pending_applications;
  }
}
