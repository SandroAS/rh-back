import { JobPosition } from '@/entities/job-position.entity';
import JobPositionLevelsGroupResponseDto from '@/modules/job-positions-levels-groups/dtos/job-positions-levels-group-response.dto';
import { Expose } from 'class-transformer';

export default class JobPositionResponseDto {
  @Expose()
  uuid: string;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  cbo_code: string;

  @Expose()
  base_salary: number;

  @Expose()
  levelsGroup: JobPositionLevelsGroupResponseDto;

  constructor(partial: JobPosition) {
    this.uuid = partial.uuid;
    this.title = partial.title;
    this.description = partial.description;
    this.cbo_code = partial.cbo_code
    this.base_salary = partial.base_salary;

    if (partial.levelsGroup) {
      this.levelsGroup = new JobPositionLevelsGroupResponseDto(partial.levelsGroup);
    }
  }
}
