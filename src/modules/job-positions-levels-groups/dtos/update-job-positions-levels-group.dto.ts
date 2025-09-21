import { UpdateJobPositionsLevelDto } from '@/modules/job-positions-levels/dtos/update-job-positions-level.dto';
import { IsString, IsOptional } from 'class-validator';

export class UpdateJobPositionsLevelsGroupDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsOptional()
  jobPositionsLevels?: UpdateJobPositionsLevelDto[];
}
