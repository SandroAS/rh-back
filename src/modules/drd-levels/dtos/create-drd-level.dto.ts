import { IsNotEmpty, IsInt, IsPositive, IsString } from 'class-validator';

export class CreateDRDLevelDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  order: number;
}
