import { EntityManager, Repository } from 'typeorm';
import { SystemModule, SystemModuleName } from '@/entities/system-module.entity';
type SystemModuleColumns = 'id' | 'uuid' | 'name' | 'created_at' | 'updated_at';
export declare class SystemModulesService {
    private systemModuleRepository;
    constructor(systemModuleRepository: Repository<SystemModule>);
    create(name: SystemModuleName): Promise<SystemModule>;
    findAll(select?: SystemModuleColumns[]): Promise<SystemModule[]>;
    findOneById(id: number): Promise<SystemModule | undefined>;
    findOneByUuid(uuid: string, manager?: EntityManager): Promise<SystemModule | undefined>;
    findByName(name: SystemModuleName, manager?: EntityManager): Promise<SystemModule | undefined>;
    findOneByName(name: SystemModuleName): Promise<SystemModule | undefined>;
    update(id: number, newName: SystemModuleName): Promise<SystemModule>;
    remove(id: number): Promise<boolean>;
}
export {};
