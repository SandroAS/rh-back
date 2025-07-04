import { Repository, DeepPartial, FindManyOptions, FindOneOptions } from 'typeorm';
import { BaseEntity } from '../entities/base.entity';
import { PaginationDto } from '../dtos/pagination.dto';
export interface PaginationResult<T> {
    data: T[];
    total: number;
    page: number;
    last_page: number;
    limit: number;
}
export declare abstract class BaseService<T extends BaseEntity> {
    protected readonly repository: Repository<T>;
    constructor(repository: Repository<T>);
    create(data: DeepPartial<T>): Promise<T>;
    findAndPaginate(pagination: PaginationDto, searchColumns?: string[], additionalWhere?: (qb: any) => void): Promise<PaginationResult<T>>;
    findAll(options?: FindManyOptions<T>): Promise<T[]>;
    findById(id: number, options?: FindOneOptions<T>): Promise<T | undefined>;
    findByUuid(uuid: string, options?: FindOneOptions<T>): Promise<T | undefined>;
    findOne(options: FindOneOptions<T>): Promise<T | undefined>;
    update(id: number, data: DeepPartial<T>): Promise<T>;
    remove(id: number): Promise<boolean>;
    updateByUuid(uuid: string, data: DeepPartial<T>, accountId?: number): Promise<T>;
    removeByUuid(uuid: string, accountId?: number): Promise<boolean>;
}
