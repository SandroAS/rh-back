import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class UpdateJobPositionDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  @IsString()
  @IsOptional()
  cbo_code?: string;

  @IsOptional()
  @IsNumber()
  @IsOptional()
  base_salary?: number;
}
