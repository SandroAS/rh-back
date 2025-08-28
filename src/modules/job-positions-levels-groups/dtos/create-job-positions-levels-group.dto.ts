import { CreateJobPositionsLevelDto } from '@/modules/job-positions-levels/dtos/create-job-positions-level.dto';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateJobPositionsLevelsGroupDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  jobPositionsLevels?: CreateJobPositionsLevelDto[];
}
