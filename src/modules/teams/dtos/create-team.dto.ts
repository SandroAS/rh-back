import { IsNotEmpty, IsString, IsArray, IsUUID, ArrayNotEmpty, IsOptional } from 'class-validator';

export class CreateTeamDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsUUID('4')
  leader: string;

  @IsOptional()
  @IsUUID('4')
  sector_uuid?: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('4', { each: true })
  member_uuids: string[];
}
