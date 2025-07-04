import { OdontogramCategoryType } from '@/entities/odontogram-category.entity';
import { IsNotEmpty, IsString, IsEnum, Matches } from 'class-validator';

export class CreateOdontogramCategoryDto {
  @IsNotEmpty({ message: 'O nome da categoria é obrigatório.' })
  @IsString({ message: 'O nome da categoria deve ser uma string.' })
  name: string;

  @IsNotEmpty({ message: 'A cor da categoria é obrigatória.' })
  @IsString({ message: 'A cor deve ser uma string.' })
  @Matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, { message: 'A cor deve estar no formato HEX (ex: #RRGGBB ou #RGB).' })
  color: string;

  @IsNotEmpty({ message: 'O tipo da categoria é obrigatório.' })
  @IsEnum(OdontogramCategoryType, { message: 'O tipo da categoria deve ser TOOTH ou FACE.' })
  type: OdontogramCategoryType;
}
