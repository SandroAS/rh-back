import { IsUUID, IsInt, IsOptional, Min } from 'class-validator';

export class CareerPlanJobPositionItemDto {
  @IsUUID('4', { message: 'O UUID do cargo é inválido.' })
  job_position_uuid: string;

  @IsInt()
  @Min(0)
  order: number;

  @IsOptional()
  @IsUUID('4', { message: 'O UUID do plano de carreira Y é inválido.' })
  career_plan_y_uuid?: string | null;
}
