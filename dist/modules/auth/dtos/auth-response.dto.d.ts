import { Gender, User } from '@/entities/user.entity';
import { RoleResponseDto } from '@/modules/roles/dtos/role-response.dto';
import { AccountResponseDto } from '@/modules/accounts/dtos/account-response.dto';
import { UserMetasResponseDto } from '@/modules/user-metas/dtos/user-metas-response.dto';
import { CompanyAuthResponseDto } from '@/modules/companies/dtos/company-auth-response.dto';
import JobPositionSimpleResponseDto from '@/modules/job-positions/dtos/job-position-simple-response.dto';
export declare class AuthResponseDto {
    uuid: string;
    name: string;
    email: string;
    cellphone: string;
    cpf: string;
    profile_img_url: string;
    gender: Gender;
    is_active: boolean;
    password?: string;
    role: RoleResponseDto;
    account: AccountResponseDto;
    userMetas: UserMetasResponseDto[];
    companies: CompanyAuthResponseDto[];
    jobPosition: JobPositionSimpleResponseDto;
    constructor(partial: Partial<User>);
}
