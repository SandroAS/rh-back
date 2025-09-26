import { IsNotEmpty, IsString, IsArray, IsUUID, IsOptional } from 'class-validator';

export class CreateSectorDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsArray()
  @IsUUID('4', { each: true })
  @IsOptional()
  user_uuids?: string[];
}
