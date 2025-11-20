import { UpdateFormDto } from '@/modules/forms/dtos/update-form.dto';
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class UpdateEvaluationDto {
  @IsOptional()
  @IsString()
  readonly drd_uuid?: string | null;

  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsString()
  readonly description: string | null;

  @IsNotEmpty()
  @IsInt()
  @Min(3)
  readonly rate: number;

  @IsOptional()
  @IsString()
  readonly created_by_user_uuid?: string;

  @IsNotEmpty()
  readonly form: UpdateFormDto;
}
