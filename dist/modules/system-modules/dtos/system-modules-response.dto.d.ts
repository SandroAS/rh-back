import { SystemModule, SystemModuleName } from '@/entities/system-module.entity';
export declare class SystemModuleResponseDto {
    uuid: string;
    name: SystemModuleName;
    constructor(partial: Partial<SystemModule>);
}
