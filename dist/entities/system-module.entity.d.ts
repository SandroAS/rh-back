import { Account } from './account.entity';
export declare enum SystemModuleName {
    EMPLOYEE_MANAGEMENT = "employee_management",
    RECRUITMENT = "recruitment",
    PERFORMANCE_MANAGEMENT = "performance_management",
    CAREER_DEVELOPMENT = "career_development",
    TRAINING_DEVELOPMENT = "training_development",
    PAYROLL = "payroll",
    TIME_ATTENDANCE = "time_attendance",
    BENEFITS_COMPENSATION = "benefits_compensation",
    ONBOARDING_OFFBOARDING = "onboarding_offboarding"
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
