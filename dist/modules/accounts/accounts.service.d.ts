import { EntityManager, Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Account } from '@/entities/account.entity';
import { CreateAccountDto } from './dtos/create-account.dto';
import { UpdateAccountDto } from './dtos/update-account.dto';
import { SystemModulesService } from '../system-modules/system-modules.service';
import { User } from '@/entities/user.entity';
import { AccountUsersResponseDto } from './dtos/account-users-response.dto';
import { MinioService } from '@/minio/minio.service';
import { CreateAccountUserDto } from './dtos/create-account-user.dto';
import { UsersService } from '../users/users.service';
import { UpdateAccountUserDto } from './dtos/update-account-user-dto';
import { RolesService } from '../roles/roles.service';
import { PaginationDto } from '@/common/dtos/pagination.dto';
import { AccountUsersResponsePaginationDto } from './dtos/account-users-response-pagination.dto';
export declare class AccountsService {
    private readonly accountRepository;
    private readonly systemModuleService;
    private readonly minioService;
    private readonly usersService;
    private readonly rolesService;
    private readonly eventEmitter;
    constructor(accountRepository: Repository<Account>, systemModuleService: SystemModulesService, minioService: MinioService, usersService: UsersService, rolesService: RolesService, eventEmitter: EventEmitter2);
    create(data: CreateAccountDto, manager?: EntityManager): Promise<Account>;
    createAccountUser(accountUser: CreateAccountUserDto, user: User): Promise<{
        uuid: string;
        role: {
            uuid: string;
        };
    }>;
    findAll(): Promise<Account[]>;
    findAllAccountUsers(user: User): Promise<AccountUsersResponseDto>;
    findAllAccountUsersWithPagination(user: User, pagination: PaginationDto): Promise<AccountUsersResponsePaginationDto>;
    findOne(id: number, manager?: EntityManager): Promise<Account>;
    update(id: number, data: UpdateAccountDto, manager?: EntityManager): Promise<Account>;
    updateAccountUser(uuid: string, accountUser: UpdateAccountUserDto, authUser: User): Promise<{
        uuid: string;
        role: {
            uuid: string;
        };
    }>;
    updateAccountUserIsActive(uuid: string): Promise<boolean>;
    remove(id: number): Promise<void>;
}
