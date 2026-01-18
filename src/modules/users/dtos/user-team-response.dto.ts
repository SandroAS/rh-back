import { User } from '@/entities/user.entity';
import { TeamResponseDto } from '@/modules/teams/dtos/team-response.dto';
import { Expose, Type } from 'class-transformer';
import JobPositionSimpleResponseDto from '@/modules/job-positions/dtos/job-position-simple-response.dto';

export class UserTeamResponseDto {
  @Expose()
  uuid: string;
  
  @Expose()
  name: string;
  
  @Expose()
  profile_img_url: string | null;
  
  @Expose()
  @Type(() => JobPositionSimpleResponseDto)
  jobPosition: JobPositionSimpleResponseDto | null;
  
  @Expose()
  @Type(() => TeamResponseDto)
  teams: TeamResponseDto[]; 

  constructor(user: User) {
    this.uuid = user.uuid;
    this.name = user.name;
    this.profile_img_url = user.profile_img_url;
    this.jobPosition = user.jobPosition ? new JobPositionSimpleResponseDto(user.jobPosition) : null;

    this.teams = user.teamMembers
      .filter(member => member.team) 
      .map(member => new TeamResponseDto(member.team)); 
  }
}
