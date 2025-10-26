import { IsNotEmpty, IsInt, IsPositive, IsString } from 'class-validator';

export class UpdateDRDLevelDto {
  @IsNotEmpty()
  @IsString()
  uuid: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  order: number;
}
