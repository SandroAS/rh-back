import { IsNotEmpty, IsString, IsInt, IsOptional, Min } from 'class-validator';

export class CreateEvaluationDto {
  @IsNotEmpty()
  @IsInt()
  readonly form_id: number;

  @IsOptional()
  @IsInt()
  readonly drd_id?: number | null;

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
}
