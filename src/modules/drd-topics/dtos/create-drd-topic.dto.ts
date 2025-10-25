import { IsNotEmpty, IsInt, IsPositive, IsString, ValidateNested, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateDRDTopicItemDto } from '@/modules/drd-topic-items/dtos/create-drd-topic-item.dto';

export class CreateDRDTopicDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  order: number;

  @ArrayMinSize(1, { message: 'É obrigatório informar no mínimo 1 item para o tópico.' })
  @ValidateNested({ each: true })
  @Type(() => CreateDRDTopicItemDto)
  drdTopicItems: CreateDRDTopicItemDto[];
}
