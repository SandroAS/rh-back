import { Expose, Type } from 'class-transformer';
import { JobPosition } from '@/entities/job-position.entity';
import { JobPositionsLevelsGroupPanelResponseDto } from '../../job-positions-levels/dtos/job-positions-levels-group-panel-response.dto';
import { DrdPanelResponseDto } from '../../drds/dtos/drd-panel-response.dto';

export class JobPositionPanelResponseDto {
  @Expose()
  uuid: string;

  @Expose()
  title: string;

  @Expose()
  @Type(() => JobPositionsLevelsGroupPanelResponseDto)
  levelsGroup: JobPositionsLevelsGroupPanelResponseDto | null;

  @Expose()
  @Type(() => DrdPanelResponseDto)
  drd: DrdPanelResponseDto | null;

  constructor(jobPosition: JobPosition) {
    this.uuid = jobPosition.uuid;
    this.title = jobPosition.title;
    this.levelsGroup = jobPosition.levelsGroup
      ? new JobPositionsLevelsGroupPanelResponseDto(jobPosition.levelsGroup)
      : null;
    this.drd = jobPosition.drd ? new DrdPanelResponseDto(jobPosition.drd) : null;
  }
}
