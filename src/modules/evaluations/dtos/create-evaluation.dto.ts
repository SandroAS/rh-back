import { CreateFormDto } from '@/modules/forms/dtos/create-form.dto';
import { IsNotEmpty, IsString, IsInt, IsOptional, Min } from 'class-validator';

export class CreateEvaluationDto {
  @IsOptional()
  @IsString()
  readonly drd_uuid?: string | null;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly description: string | null;

  @IsNotEmpty()
  @IsInt()
  @Min(3)
  readonly rate: number;

  @IsNotEmpty()
  @IsString()
  readonly created_by_user_uuid: string;

  @IsNotEmpty()
  readonly form: CreateFormDto;
}
