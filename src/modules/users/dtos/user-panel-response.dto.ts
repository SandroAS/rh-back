import { Expose, Type } from 'class-transformer';
import { User } from '@/entities/user.entity';
import { JobPositionPanelResponseDto } from '../../job-positions/dtos/job-position-panel-response.dto';
import { EvaluationApplicationPanelResponseDto } from '../../evaluation-applications/dtos/evaluation-application-panel-response.dto';

export class UserPanelResponseDto {
  @Expose()
  uuid: string;

  @Expose()
  name: string;

  @Expose()
  profile_img_url: string | null;

  @Expose()
  @Type(() => JobPositionPanelResponseDto)
  jobPosition: JobPositionPanelResponseDto | null;

  @Expose()
  @Type(() => EvaluationApplicationPanelResponseDto)
  evaluationsReceived: EvaluationApplicationPanelResponseDto[];

  constructor(user: User) {
    this.uuid = user.uuid;
    this.name = user.name;
    this.profile_img_url = user.profile_img_url ?? null;
    this.jobPosition = user.jobPosition
      ? new JobPositionPanelResponseDto(user.jobPosition)
      : null;
    this.evaluationsReceived = (user.evaluationsReceived || []).map(
      (app) => new EvaluationApplicationPanelResponseDto(app),
    );
  }
}
