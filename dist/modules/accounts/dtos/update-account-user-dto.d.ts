import { RolesTypes } from '@/modules/roles/dtos/roles-types.dto';
export declare class UpdateAccountUserDto {
    name: string;
    email: string;
    cellphone: string;
    cpf: string;
    password?: string;
    confirmPassword?: string;
    role: RolesTypes;
}
