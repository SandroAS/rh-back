import { RolesTypes } from '@/modules/roles/dtos/roles-types.dto';
export declare class UpdateAccountUserDto {
    name: string;
    email: string;
    cellphone: string;
    cpf: string;
    password?: string;
    confirmPassword?: string;
    role: RolesTypes;
    job_position_uuid?: string;
    sector_uuid?: string;
    job_position_current_level_uuid?: string | null;
    career_plan_uuid?: string;
}
