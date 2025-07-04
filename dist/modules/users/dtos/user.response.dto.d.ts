import { Gender, User } from '@/entities/user.entity';
import { RoleResponseDto } from '@/modules/roles/dtos/role-response.dto';
export declare class UserResponseDto {
    uuid: string;
    name: string;
    email: string;
    cellphone: string;
    cpf: string;
    is_active: boolean;
    gender: Gender;
    profile_img_url: string;
    role: RoleResponseDto;
    constructor(partial: User);
}
