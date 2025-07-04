import { Gender } from '@/entities/user.entity';
export declare class UserDto {
    id: number;
    uuid: string;
    name: string;
    email: string;
    cellphone: string;
    cpf: string;
    gender: Gender;
    created_at: Date;
    updated_at: Date;
}
