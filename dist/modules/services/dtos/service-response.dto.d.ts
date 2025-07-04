import { Service } from '@/entities/service.entity';
import { SystemModuleResponseDto } from '@/modules/system-modules/dtos/system-modules-response.dto';
export declare class ServiceResponseDto {
    id: number;
    account_id: number;
    system_module_id: number;
    uuid: string;
    name: string;
    description: string;
    price: number;
    systemModule: SystemModuleResponseDto;
    constructor(partial: Partial<Service>);
}
