import { Expose, Type } from 'class-transformer';
import { JobPosition } from '@/entities/job-position.entity';
import JobPositionResponseDto from './job-position-response.dto';

export class JobPositionsPaginationResponseDto {
  @Expose()
  total: number;

  @Expose()
  page: number;

  @Expose()
  last_page: number;

  @Expose()
  limit: number;

  @Expose()
  @Type(() => JobPositionResponseDto)
  data: JobPositionResponseDto[];

  constructor(jobPositionsPaginate: { data: JobPosition[], total: number, page: number, last_page: number, limit: number }) {
    this.total = jobPositionsPaginate.total;
    this.page = jobPositionsPaginate.page;
    this.last_page = jobPositionsPaginate.last_page;
    this.limit = jobPositionsPaginate.limit;
    this.data = [];

    if (jobPositionsPaginate.data && jobPositionsPaginate.data.length > 0) {
      this.data = jobPositionsPaginate.data.map(
        (jobPostion: JobPosition) => new JobPositionResponseDto(jobPostion)
      );
    }
  }
}
