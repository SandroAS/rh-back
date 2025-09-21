import { JobPositionsLevelsGroup } from '@/entities/job-positions-levels-group.entity';
import JobPositionLevelResponseDto from '@/modules/job-positions-levels/dtos/job-positions-level-response.dto';
import { UserAvatarResponseDto } from '@/modules/users/dtos/user-avatar-response.dto';
import { Expose } from 'class-transformer';

export default class JobPositionLevelsGroupResponseDto {
  @Expose()
  uuid: string;

  @Expose()
  name: string;

  @Expose()
  createdBy: UserAvatarResponseDto;

  @Expose()
  jobPositionsLevels: JobPositionLevelResponseDto[];

  constructor(partial: JobPositionsLevelsGroup) {
    this.uuid = partial.uuid;
    this.name = partial.name;

    if (partial.createdBy) {
      this.createdBy = new UserAvatarResponseDto(partial.createdBy);
    }

    if (partial.jobPositionsLevels && partial.jobPositionsLevels.length > 0) {
      this.jobPositionsLevels = partial.jobPositionsLevels.map(
        (jobsPositionsLevel) => new JobPositionLevelResponseDto(jobsPositionsLevel)
      );
    }
  }
}
