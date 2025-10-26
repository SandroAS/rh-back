import { Expose, Type } from 'class-transformer';
import { DRD } from '@/entities/drd.entity'; 
import DrdLevelResponseDto from '@/modules/drd-levels/dtos/drd-level-response.dto';
import DrdMetricResponseDto from '@/modules/drd-metrics/dtos/drd-metric.response.dto';
import DrdTopicResponseDto from '@/modules/drd-topics/dtos/drd-topic-response.dto';
import { UserAvatarResponseDto } from '@/modules/users/dtos/user-avatar-response.dto';
import JobPositionSimpleResponseDto from '@/modules/job-positions/dtos/job-position-simple-response.dto';

export class DRDResponseDto {
  @Expose()
  uuid: string;

  @Expose()
  rate: number;

  @Expose()
  @Type(() => JobPositionSimpleResponseDto)
  jobPosition: JobPositionSimpleResponseDto;

  @Expose()
  @Type(() => UserAvatarResponseDto)
  createdByUser: UserAvatarResponseDto;
  
  @Expose()
  @Type(() => DrdLevelResponseDto)
  drdLevels: DrdLevelResponseDto[];

  @Expose()
  @Type(() => DrdMetricResponseDto)
  drdMetrics: DrdMetricResponseDto[];

  @Expose()
  @Type(() => DrdTopicResponseDto)
  drdTopics: DrdTopicResponseDto[];

  constructor(drd: DRD) {
    this.uuid = drd.uuid;
    this.rate = drd.rate;

    if (drd.jobPosition) {
      this.jobPosition = new JobPositionSimpleResponseDto(drd.jobPosition);
    }

    if (drd.createdBy) {
      this.createdByUser = new UserAvatarResponseDto(drd.createdBy);
    }

    this.drdLevels = drd.levels ? drd.levels.map(level => new DrdLevelResponseDto(level)) : [];
    this.drdMetrics = drd.metrics ? drd.metrics.map(metric => new DrdMetricResponseDto(metric)) : [];
    this.drdTopics = drd.topics ? drd.topics.map(topic => new DrdTopicResponseDto(topic)) : [];
  }
}
