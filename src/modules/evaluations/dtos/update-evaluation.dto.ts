import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class UpdateEvaluationDto {
  @IsNotEmpty()
  @IsInt()
  readonly form_id: number;

  @IsOptional()
  @IsInt()
  readonly drd_id?: number | null;

  @IsOptional()
  @IsString()
  readonly name?: string;

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
}
