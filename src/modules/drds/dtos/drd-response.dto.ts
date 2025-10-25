import { Expose, Type } from 'class-transformer';
import { DRD } from '@/entities/drd.entity'; 
import DrdLevelResponseDto from '@/modules/drd-levels/dtos/drd-level-response.dto';
import DrdMetricResponseDto from '@/modules/drd-metrics/dtos/drd-metric.response.dto';
import DrdTopicResponseDto from '@/modules/drd-topics/dtos/drd-topic-response.dto';
import JobPositionResponseDto from '@/modules/job-positions/dtos/job-position-response.dto';
import { UserAvatarResponseDto } from '@/modules/users/dtos/user-avatar-response.dto';

export class DRDResponseDto {
  @Expose()
  uuid: string;

  @Expose()
  rate: number;

  @Expose()
  @Type(() => JobPositionResponseDto)
  jobPosition: JobPositionResponseDto;

  @Expose()
  @Type(() => UserAvatarResponseDto)
  createdByUser: UserAvatarResponseDto;
  
  @Expose()
  @Type(() => DrdLevelResponseDto)
  levels: DrdLevelResponseDto[];

  @Expose()
  @Type(() => DrdMetricResponseDto)
  metrics: DrdMetricResponseDto[];

  @Expose()
  @Type(() => DrdTopicResponseDto)
  topics: DrdTopicResponseDto[];

  constructor(drd: DRD) {
    this.uuid = drd.uuid;
    this.rate = drd.rate;  

    if (drd.jobPosition) {
      this.jobPosition = new JobPositionResponseDto(drd.jobPosition);
    }

    if (drd.createdBy) {
      this.createdByUser = new UserAvatarResponseDto(drd.createdBy);
    }

    this.levels = drd.levels ? drd.levels.map(level => new DrdLevelResponseDto(level)) : [];
    this.metrics = drd.metrics ? drd.metrics.map(metric => new DrdMetricResponseDto(metric)) : [];
    this.topics = drd.topics ? drd.topics.map(topic => new DrdTopicResponseDto(topic)) : [];
  }
}
