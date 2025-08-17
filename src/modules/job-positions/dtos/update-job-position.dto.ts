import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateJobPositionDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  job_title?: string;

  @IsOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  @IsString()
  @IsOptional()
  cbo_code?: string;
}
