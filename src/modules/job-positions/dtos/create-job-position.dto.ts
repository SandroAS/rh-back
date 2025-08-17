import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateJobPositionDto {
  @IsString()
  @IsNotEmpty()
  job_title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  cbo_code?: string;
}
