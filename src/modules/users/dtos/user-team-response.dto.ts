import { User } from '@/entities/user.entity';
import { TeamResponseDto } from '@/modules/teams/dtos/team-response.dto';

export class UserTeamResponseDto {
  uuid: string;
  name: string;
  profile_img_url: string | null;
  
  teams: TeamResponseDto[]; 

  constructor(user: User) {
    this.uuid = user.uuid;
    this.name = user.name;
    this.profile_img_url = user.profile_img_url;

    this.teams = user.teamMembers
      .filter(member => member.team) 
      .map(member => new TeamResponseDto(member.team)); 
  }
}
