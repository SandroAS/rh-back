import { IsNotEmpty, IsString, IsInt, Min } from 'class-validator';

export class CreateFormQuestionOptionDto {
  @IsNotEmpty()
  @IsString()
  readonly text: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  readonly order: number;
  
  @IsNotEmpty()
  @IsInt()
  readonly question_id: number;
}
