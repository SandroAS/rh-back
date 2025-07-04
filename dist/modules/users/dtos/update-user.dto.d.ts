import { Gender } from '@/entities/user.entity';
export declare class UpdateUserDto {
    name?: string;
    email?: string;
    cellphone?: string;
    cpf?: string;
    gender?: Gender;
    is_active?: boolean;
    profile_img_url?: string;
    password?: string;
    google_id?: string;
    account_id?: number;
}
