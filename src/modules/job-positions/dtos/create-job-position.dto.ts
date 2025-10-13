import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsUUID } from 'class-validator';

export class CreateJobPositionDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  cbo_code?: string;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  base_salary?: number

  @IsUUID()
  @IsString()
  @IsOptional()
  job_positions_levels_group_uuid?: string;
}
