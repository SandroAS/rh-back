import { IsNotEmpty, IsString, IsArray, IsUUID, IsOptional } from 'class-validator';

export class UpdateTeamDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsUUID('4')
  lead?: string;

  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  member_uuids: string[];
}
