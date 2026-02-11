import { Expose, Type } from 'class-transformer';
import { UserAvatarResponseDto } from '@/modules/users/dtos/user-avatar-response.dto';
import { EvaluationApplication } from '@/entities/evaluation-application.entity';

/**
 * Item de aplicação pendente (para o avaliador responder), com data limite.
 */
export class PendingEvaluationApplicationItemDto {
  @Expose()
  uuid: string;

  @Expose()
  name: string;

  @Expose()
  expiration_date: Date | null;

  @Expose()
  @Type(() => UserAvatarResponseDto)
  evaluated_user: UserAvatarResponseDto | null;

  constructor(app: EvaluationApplication) {
    this.uuid = app.uuid;
    this.name = app.name;
    this.expiration_date = app.expiration_date
      ? (app.expiration_date instanceof Date
          ? app.expiration_date
          : new Date(app.expiration_date))
      : null;
    this.evaluated_user = app.evaluatedUser
      ? new UserAvatarResponseDto(app.evaluatedUser)
      : null;
  }
}
