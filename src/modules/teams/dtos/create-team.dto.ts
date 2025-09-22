import { IsNotEmpty, IsString, IsArray, IsUUID, ArrayNotEmpty } from 'class-validator';

export class CreateTeamDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsUUID('4')
  lead: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('4', { each: true })
  member_uuids: string[];
}
