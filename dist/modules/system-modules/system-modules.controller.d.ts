import { SystemModulesService } from './system-modules.service';
export declare class SystemModulesController {
    private readonly systemModuleService;
    constructor(systemModuleService: SystemModulesService);
    findAll(): Promise<import("../../entities/system-module.entity").SystemModule[]>;
}
