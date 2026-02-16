import { IsOptional, IsNotEmpty, IsString, IsArray, ValidateNested, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';
import { CareerPlanJobPositionItemDto } from './career-plan-job-position-item.dto';

export class UpdateCareerPlanDto {
  @IsOptional()
  @IsNotEmpty({ message: 'O nome não pode ser vazio.' })
  @IsString()
  @MaxLength(255)
  name?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CareerPlanJobPositionItemDto)
  careerPlanJobPositions?: CareerPlanJobPositionItemDto[];
}
