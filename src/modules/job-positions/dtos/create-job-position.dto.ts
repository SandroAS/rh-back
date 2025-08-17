import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

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
  @IsOptional()
  base_salary?: number
}
