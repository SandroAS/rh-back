import { IsString, IsArray, IsUUID, IsOptional } from 'class-validator';

export class UpdateSectorDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsArray()
  @IsOptional()
  @IsUUID('4', { each: true })
  user_uuids?: string[];
}