import { Gender, User } from '@/entities/user.entity';
import { RoleResponseDto } from '@/modules/roles/dtos/role-response.dto';
import { Expose, Type } from 'class-transformer';
import JobPositionSimpleResponseDto from '@/modules/job-positions/dtos/job-position-simple-response.dto';
import { SectorResponseDto } from '@/modules/sectors/dtos/sector-response.dto';

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
  @Type(() => SectorResponseDto)
  sectors: SectorResponseDto[] | null;

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

    this.jobPosition = partial.jobPosition ? new JobPositionSimpleResponseDto(partial.jobPosition) : null;

    if (partial.sectors) {
      const sectors = partial.sectors.map(sector => new SectorResponseDto(sector));
      console.log(sectors);
      this.sectors = sectors;
    }
  }
}
