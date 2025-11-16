import { IsString, IsInt, Min, IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateFormQuestionOptionDto {
  @IsOptional()
  @IsString()
  readonly uuid?: string;

  @IsOptional()
  @IsString()
  readonly text?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  readonly order?: number;
  
  @IsNotEmpty()
  @IsInt()
  readonly question_id: number;
}
