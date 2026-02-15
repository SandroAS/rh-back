import { Expose } from 'class-transformer';
import { JobPositionsLevelsGroup } from '@/entities/job-positions-levels-group.entity';

export class JobPositionsLevelsGroupPanelResponseDto {
  @Expose()
  uuid: string;

  @Expose()
  name: string;

  constructor(partial: Partial<JobPositionsLevelsGroup>) {
    this.uuid = partial.uuid;
    this.name = partial.name;
  }
}
