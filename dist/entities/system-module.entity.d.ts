import { Account } from './account.entity';
export declare enum SystemModuleName {
    EMPLOYEE_MANAGEMENT = "EMPLOYEE_MANAGEMENT",
    RECRUITMENT = "RECRUITMENT",
    PERFORMANCE_MANAGEMENT = "PERFORMANCE_MANAGEMENT",
    CAREER_DEVELOPMENT = "CAREER_DEVELOPMENT",
    TRAINING_DEVELOPMENT = "TRAINING_DEVELOPMENT",
    PAYROLL = "PAYROLL",
    TIME_ATTENDANCE = "TIME_ATTENDANCE",
    BENEFITS_COMPENSATION = "BENEFITS_COMPENSATION",
    ONBOARDING_OFFBOARDING = "ONBOARDING_OFFBOARDING"
}
export declare class SystemModule {
    id: number;
    uuid: string;
    generateUuid(): void;
    name: SystemModuleName;
    accounts: Account[];
    created_at: Date;
    updated_at: Date;
}
