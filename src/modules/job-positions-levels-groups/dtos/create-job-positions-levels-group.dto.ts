import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateJobPositionsLevelsGroupDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsOptional()
  job_position_id?: number;
}
