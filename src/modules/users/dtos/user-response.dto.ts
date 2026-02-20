import { Gender, User } from '@/entities/user.entity';
import { RoleResponseDto } from '@/modules/roles/dtos/role-response.dto';
import { Expose, Type } from 'class-transformer';
import JobPositionSimpleResponseDto from '@/modules/job-positions/dtos/job-position-simple-response.dto';
import { SectorResponseDto } from '@/modules/sectors/dtos/sector-response.dto';
import JobPositionLevelResponseDto from '@/modules/job-positions-levels/dtos/job-positions-level-response.dto';
import { CareerPlanResponseDto } from '@/modules/career-plans/dtos/career-plan-response.dto';

export class UserResponseDto {
  @Expose()
  uuid: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  cellphone: string;

  @Expose()
  cpf: string;

  @Expose()
  is_active: boolean;

  @Expose()
  gender: Gender;

  @Expose()
  profile_img_url: string;

  @Expose()
  role: RoleResponseDto

  @Expose()
  @Type(() => JobPositionSimpleResponseDto)
  jobPosition: JobPositionSimpleResponseDto | null;

  @Expose()
  @Type(() => JobPositionLevelResponseDto)
  jobPositionCurrentLevel: JobPositionLevelResponseDto | null;

  @Expose()
  @Type(() => SectorResponseDto)
  sectors: SectorResponseDto[] | null;

  @Expose()
  @Type(() => CareerPlanResponseDto)
  careerPlan: CareerPlanResponseDto | null;

  constructor(partial: User) {
    this.uuid = partial.uuid;
    this.name = partial.name;
    this.email = partial.email;
    this.cellphone = partial.cellphone;
    this.cpf = partial.cpf;
    this.is_active = partial.is_active;
    this.gender = partial.gender;
    this.profile_img_url = partial.profile_img_url;

    if (partial.role) {
      this.role = new RoleResponseDto(partial.role);
    }

    if (partial.jobPosition) {
      this.jobPosition = new JobPositionSimpleResponseDto(partial.jobPosition);
    }

    if (partial.jobPositionCurrentLevel) {
      this.jobPositionCurrentLevel = new JobPositionLevelResponseDto(partial.jobPositionCurrentLevel);
    }

    if (partial.sectors) {
      const sectors = partial.sectors.map(sector => new SectorResponseDto(sector));
      this.sectors = sectors;
    }

    if (partial.careerPlan) {
      this.careerPlan = new CareerPlanResponseDto(partial.careerPlan);
    }
  }
}
