import { IsDateString, IsNotEmpty } from 'class-validator';

export class UpdateEvaluationApplicationDto {
  @IsNotEmpty()
  @IsDateString()
  readonly started_date: string;

  @IsNotEmpty()
  @IsDateString()
  readonly expiration_date: string;
}
