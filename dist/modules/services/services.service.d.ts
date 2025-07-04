import { EntityManager, Repository } from 'typeorm';
import { BaseService } from '@/common/services/base.service';
import { Service } from '@/entities/service.entity';
import { PaginationDto } from '@/common/dtos/pagination.dto';
import { CreateServiceDto } from './dtos/create-service.dto';
import { UpdateServiceDto } from './dtos/update-service.dto';
import { SystemModulesService } from '../system-modules/system-modules.service';
import { SystemModuleName } from '@/entities/system-module.entity';
export declare class ServicesService extends BaseService<Service> {
    private readonly serviceRepository;
    private readonly systemModulesService;
    constructor(serviceRepository: Repository<Service>, systemModulesService: SystemModulesService);
    createServiceForAccount(createServiceDto: CreateServiceDto, accountId: number, manager?: EntityManager): Promise<Service>;
    createDefaultServicesForNewAccount(selectedClinicType: SystemModuleName, accountId: number, manager?: EntityManager): Promise<void>;
    findAllPaginatedByAccount(pagination: PaginationDto, accountId: number): Promise<import("@/common/services/base.service").PaginationResult<Service>>;
    findOneByUuidForAccount(uuid: string, accountId: number, relations?: string[]): Promise<Service>;
    updateForAccount(uuid: string, updateServiceDto: UpdateServiceDto, accountId: number): Promise<Service>;
    removeForAccount(uuid: string, accountId: number): Promise<void>;
}
