import { DataSource, EntityManager, Repository } from 'typeorm';
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
import { JobPositionService } from '../job-positions/job-positions.service';
import { JobPositionsLevelsService } from '../job-positions-levels/job-positions-levels.service';
import { SectorsService } from '../sectors/sectors.service';
import { EvaluationApplicationsService } from '../evaluation-applications/evaluation-applications.service';
import { FormResponsesService } from '../form-responses/form-responses.service';
import { CareerPlansService } from '../career-plans/career-plans.service';
export declare class AccountsService {
    private readonly accountRepository;
    private readonly dataSource;
    private readonly systemModuleService;
    private readonly minioService;
    private readonly usersService;
    private readonly rolesService;
    private readonly jobPositionsService;
    private readonly jobPositionsLevelsService;
    private readonly sectorsService;
    private readonly evaluationApplicationsService;
    private readonly formResponsesService;
    private readonly careerPlansService;
    constructor(accountRepository: Repository<Account>, dataSource: DataSource, systemModuleService: SystemModulesService, minioService: MinioService, usersService: UsersService, rolesService: RolesService, jobPositionsService: JobPositionService, jobPositionsLevelsService: JobPositionsLevelsService, sectorsService: SectorsService, evaluationApplicationsService: EvaluationApplicationsService, formResponsesService: FormResponsesService, careerPlansService: CareerPlansService);
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
    totalsAccountUsers(accountId: number): Promise<{
        total: number;
        pending_job_position_settings: number;
        pending_evaluation_settings: number;
        not_evaluated_yet: number;
    }>;
}
