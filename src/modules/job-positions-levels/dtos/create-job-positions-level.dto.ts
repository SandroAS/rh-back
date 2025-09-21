import { IsString, IsNotEmpty, IsOptional, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateJobPositionsLevelDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'O valor da remuneração deve ser um número válido.' })
  @Min(0, { message: 'O valor da remuneração não pode ser negativo.' })
  salary?: number;

  @IsNumber()
  @IsOptional()
  job_positions_levels_group_id?: number;

  @IsOptional()
  @IsNumber()
  order?: number;
}
