import { Account } from './account.entity';
import { Service } from './service.entity';
export declare enum SystemModuleName {
    DENTISTRY = "DENTISTRY",
    PSYCHOLOGY = "PSYCHOLOGY",
    NUTRITION = "NUTRITION",
    PHYSIOTHERAPY = "PHYSIOTHERAPY"
}
export declare class SystemModule {
    id: number;
    uuid: string;
    generateUuid(): void;
    name: SystemModuleName;
    accounts: Account[];
    services: Service[];
    created_at: Date;
    updated_at: Date;
}
