import { IsUUID, IsInt, IsBoolean, IsOptional, Min } from 'class-validator';

export class CareerPlanJobPositionItemDto {
  @IsUUID('4', { message: 'O UUID do cargo é inválido.' })
  job_position_uuid: string;

  @IsInt()
  @Min(0)
  order: number;

  @IsBoolean()
  career_in_ypsilon: boolean;

  @IsOptional()
  @IsInt()
  @Min(0)
  ypsilon_after_order?: number | null;
}
