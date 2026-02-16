import { IsNotEmpty, IsString, IsArray, ValidateNested, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';
import { CareerPlanJobPositionItemDto } from './career-plan-job-position-item.dto';

export class CreateCareerPlanDto {
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @IsString()
  @MaxLength(255)
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CareerPlanJobPositionItemDto)
  careerPlanJobPositions: CareerPlanJobPositionItemDto[];
}
