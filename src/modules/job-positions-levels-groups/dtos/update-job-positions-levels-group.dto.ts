import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateJobPositionsLevelsGroupDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsOptional()
  job_position_id?: number;
}
