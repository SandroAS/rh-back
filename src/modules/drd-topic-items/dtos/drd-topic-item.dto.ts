import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class DRDTopicItemDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}
