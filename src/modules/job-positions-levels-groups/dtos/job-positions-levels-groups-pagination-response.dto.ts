import { Expose, Type } from 'class-transformer';
import JobPositionLevelsGroupResponseDto from './job-positions-levels-group-response.dto';
import { JobPositionsLevelsGroup } from '@/entities/job-positions-levels-group.entity';


export class JobPositionsLevelsGroupsPaginationResponseDto {
  @Expose()
  total: number;

  @Expose()
  page: number;

  @Expose()
  last_page: number;

  @Expose()
  limit: number;

  @Expose()
  @Type(() => JobPositionLevelsGroupResponseDto)
  data: JobPositionLevelsGroupResponseDto[];

  constructor(jobPositionsLevelsGroupsPagination: { data: JobPositionsLevelsGroup[], total: number, page: number, last_page: number, limit: number }) {
    this.total = jobPositionsLevelsGroupsPagination.total;
    this.page = jobPositionsLevelsGroupsPagination.page;
    this.last_page = jobPositionsLevelsGroupsPagination.last_page;
    this.limit = jobPositionsLevelsGroupsPagination.limit;
    this.data = [];

    if (jobPositionsLevelsGroupsPagination.data && jobPositionsLevelsGroupsPagination.data.length > 0) {
      this.data = jobPositionsLevelsGroupsPagination.data.map(
        (jobPostionLevelsGroup: JobPositionsLevelsGroup) => new JobPositionLevelsGroupResponseDto(jobPostionLevelsGroup)
      );
    }
  }
}
