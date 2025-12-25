import { IsBoolean, IsNotEmpty } from 'class-validator';

export class SendEvaluationApplicationDto {
  @IsNotEmpty()
  @IsBoolean()
  readonly forEmail: boolean;

  @IsNotEmpty()
  @IsBoolean()
  readonly forSystem: boolean;
}
