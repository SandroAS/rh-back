import { Type } from 'class-transformer';
import { IsString, IsOptional, IsNumber, IsUUID } from 'class-validator';

export class UpdateJobPositionDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  cbo_code?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  base_salary?: number;

  @IsOptional()
  @IsUUID()
  @IsString()
  job_positions_levels_group_uuid?: string;
}
