import { IsString, IsNotEmpty, IsOptional, IsInt, IsPositive } from 'class-validator';

export class DRDTopicItemDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  order: number;
}
