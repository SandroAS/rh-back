import { IsString, IsNotEmpty, IsInt, IsPositive } from 'class-validator';

export class DRDLevelDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  order: number;
}
