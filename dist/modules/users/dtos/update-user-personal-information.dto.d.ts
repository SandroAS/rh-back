import { Gender } from '@/entities/user.entity';
export declare class UpdateUserPersonalInformationDto {
    name?: string;
    email?: string;
    cellphone?: string;
    cpf?: string;
    gender?: Gender;
    job_position_uuid?: string;
}
