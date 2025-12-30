import { SystemModuleName } from '@/entities/system-module.entity';
export declare class AuthSignupDto {
    name: string;
    email: string;
    cellphone: string;
    cpf: string;
    moduleType: SystemModuleName;
    password: string;
    confirmPassword?: string;
    termsAccepted: boolean;
}
