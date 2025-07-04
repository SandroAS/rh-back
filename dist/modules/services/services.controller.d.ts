import { ServicesService } from './services.service';
import { CreateServiceDto } from './dtos/create-service.dto';
import { UpdateServiceDto } from './dtos/update-service.dto';
import { ServiceResponseDto } from './dtos/service-response.dto';
import { PaginationDto } from '@/common/dtos/pagination.dto';
import { PaginationResult } from '@/common/services/base.service';
import AuthenticatedRequest from '@/common/types/authenticated-request.type';
export declare class ServicesController {
    private readonly servicesService;
    constructor(servicesService: ServicesService);
    create(createServiceDto: CreateServiceDto, req: AuthenticatedRequest): Promise<ServiceResponseDto>;
    findAll(paginationDto: PaginationDto, req: AuthenticatedRequest): Promise<PaginationResult<ServiceResponseDto>>;
    findByUuidAndModule(uuid: string, req: AuthenticatedRequest): Promise<ServiceResponseDto>;
    update(uuid: string, updateServiceDto: UpdateServiceDto, req: AuthenticatedRequest): Promise<ServiceResponseDto>;
    remove(uuid: string, req: AuthenticatedRequest): Promise<void>;
}
