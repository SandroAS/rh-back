import { CreateFormDto } from '@/modules/forms/dtos/create-form.dto';
import { IsNotEmpty, IsString, IsInt, IsOptional, Min } from 'class-validator';

export class CreateEvaluationDto {
  @IsOptional()
  @IsInt()
  readonly drd_uuid?: string | null;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsInt()
  @Min(3)
  readonly rate: number;

  @IsNotEmpty()
  @IsInt()
  readonly account_id: number;

  @IsNotEmpty()
  @IsInt()
  readonly created_by_user_id: number;

  @IsNotEmpty()
  readonly form: CreateFormDto;
}
