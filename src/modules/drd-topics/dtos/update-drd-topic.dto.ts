import { IsNotEmpty, IsInt, IsPositive, IsString, ValidateNested, ArrayMinSize, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateDRDTopicItemDto } from '@/modules/drd-topic-items/dtos/update-drd-topic-item.dto';

export class UpdateDRDTopicDto {
  @IsOptional()
  @IsString()
  uuid?: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  order: number;

  @ArrayMinSize(1, { message: 'É obrigatório informar no mínimo 1 item para o tópico.' })
  @ValidateNested({ each: true })
  @Type(() => UpdateDRDTopicItemDto)
  drdTopicItems: UpdateDRDTopicItemDto[];
}
