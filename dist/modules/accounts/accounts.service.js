"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const account_entity_1 = require("../../entities/account.entity");
const system_modules_service_1 = require("../system-modules/system-modules.service");
const system_module_entity_1 = require("../../entities/system-module.entity");
const account_users_response_dto_1 = require("./dtos/account-users-response.dto");
const minio_service_1 = require("../../minio/minio.service");
const users_service_1 = require("../users/users.service");
const crypto_1 = require("crypto");
const util_1 = require("util");
const roles_types_dto_1 = require("../roles/dtos/roles-types.dto");
const roles_service_1 = require("../roles/roles.service");
const account_users_response_pagination_dto_1 = require("./dtos/account-users-response-pagination.dto");
const job_positions_service_1 = require("../job-positions/job-positions.service");
const job_positions_levels_service_1 = require("../job-positions-levels/job-positions-levels.service");
const sectors_service_1 = require("../sectors/sectors.service");
const evaluation_applications_service_1 = require("../evaluation-applications/evaluation-applications.service");
const form_responses_service_1 = require("../form-responses/form-responses.service");
const scrypt = (0, util_1.promisify)(crypto_1.scrypt);
let AccountsService = class AccountsService {
    constructor(accountRepository, dataSource, systemModuleService, minioService, usersService, rolesService, jobPositionsService, jobPositionsLevelsService, sectorsService, evaluationApplicationsService, formResponsesService) {
        this.accountRepository = accountRepository;
        this.dataSource = dataSource;
        this.systemModuleService = systemModuleService;
        this.minioService = minioService;
        this.usersService = usersService;
        this.rolesService = rolesService;
        this.jobPositionsService = jobPositionsService;
        this.jobPositionsLevelsService = jobPositionsLevelsService;
        this.sectorsService = sectorsService;
        this.evaluationApplicationsService = evaluationApplicationsService;
        this.formResponsesService = formResponsesService;
    }
    async create(data, manager) {
        const accountRepository = manager ? manager.getRepository(account_entity_1.Account) : this.accountRepository;
        const careerDevelopmentModule = await this.systemModuleService.findOneByName(system_module_entity_1.SystemModuleName.CAREER_DEVELOPMENT);
        if (!careerDevelopmentModule) {
            throw new common_1.NotFoundException(`Módulo do Sistema ${system_module_entity_1.SystemModuleName.CAREER_DEVELOPMENT} não encontrado.`);
        }
        const account = accountRepository.create(data);
        account.systemModules = account.systemModules || [];
        account.systemModules.push(careerDevelopmentModule);
        try {
            const savedAccount = await accountRepository.save(account);
            savedAccount.systemModules = account.systemModules;
            return savedAccount;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Erro ao salvar a conta: ' + error.message);
        }
    }
    async createAccountUser(accountUser, user) {
        const existingUser = await this.usersService.findByEmail(accountUser.email);
        if (existingUser) {
            throw new common_1.BadRequestException('E-mail já está em uso, escolha outro.');
        }
        if (accountUser.role === roles_types_dto_1.RolesTypes.ADMIN) {
            throw new common_1.BadRequestException('Uma conta só pode ter um único usuário ADMIN.');
        }
        if (accountUser.role === roles_types_dto_1.RolesTypes.SUPER_ADMIN) {
            throw new common_1.BadRequestException('Não é possível cadastrar novos usuários SUPER_ADMIN no sistema.');
        }
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const salt = (0, crypto_1.randomBytes)(8).toString('hex');
            const hashBuffer = (await scrypt(accountUser.password, salt, 32));
            accountUser.password = salt + '.' + hashBuffer.toString('hex');
            const account = await this.findOne(user.account_id, queryRunner.manager);
            let jobPositionId;
            if (accountUser.job_position_uuid) {
                const jobPosition = await this.jobPositionsService.findByUuid(accountUser.job_position_uuid);
                if (!jobPosition) {
                    throw new common_1.NotFoundException('Cargo não encontrado ao tentar cadastrar o usuário.');
                }
                jobPositionId = jobPosition.id;
            }
            const userCreated = await this.usersService.createSecondaryUser(roles_types_dto_1.RolesTypes[accountUser.role], accountUser, account.id, queryRunner.manager, jobPositionId);
            await queryRunner.commitTransaction();
            return { uuid: userCreated.uuid, role: { uuid: userCreated.role.uuid } };
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            throw new common_1.InternalServerErrorException('Erro ao realizar cadastro de usuário: ' + err.message);
        }
        finally {
            await queryRunner.release();
        }
    }
    async findAll() {
        return this.accountRepository.find();
    }
    async findAllAccountUsers(user) {
        const account = await this.accountRepository.findOne({
            where: { id: user.account_id },
            relations: ['users.role'],
        });
        if (!account) {
            throw new common_1.NotFoundException('Conta não encontrada ao tentar buscar usuários relacionados a ela.');
        }
        const usersWithPresignedUrls = await this.minioService.processUsersWithPresignedUrls(account.users);
        account.users = usersWithPresignedUrls;
        return new account_users_response_dto_1.AccountUsersResponseDto(account);
    }
    async findAllAccountUsersWithPagination(user, pagination) {
        const page = parseInt(pagination.page || '1', 10);
        const limit = parseInt(pagination.limit || '10', 10);
        const sortColumn = pagination.sort_column;
        const sortOrder = pagination.sort_order;
        const searchTerm = pagination.search_term;
        const [users, total] = await this.usersService.findAndPaginateByAccountId(user.account_id, page, limit, sortColumn, sortOrder, searchTerm);
        if (!users || users.length === 0) {
            return new account_users_response_pagination_dto_1.AccountUsersResponsePaginationDto({ data: [], total: 0, page, last_page: 0, limit });
        }
        const usersWithPresignedUrls = await this.minioService.processUsersWithPresignedUrls(users);
        const lastPage = Math.ceil(total / limit);
        return new account_users_response_pagination_dto_1.AccountUsersResponsePaginationDto({
            data: usersWithPresignedUrls,
            total,
            page,
            last_page: lastPage,
            limit,
        });
    }
    async findOne(id, manager) {
        const accountRepository = manager ? manager.getRepository(account_entity_1.Account) : this.accountRepository;
        const account = await accountRepository.findOne({ where: { id } });
        return account;
    }
    async update(id, data, manager) {
        const accountRepository = manager ? manager.getRepository(account_entity_1.Account) : this.accountRepository;
        const account = await this.findOne(id, manager);
        if (!account) {
            throw new common_1.NotFoundException('Conta não encontrada ao tentar atualizar.');
        }
        Object.assign(account, data);
        return accountRepository.save(account);
    }
    async updateAccountUser(uuid, accountUser, authUser) {
        const user = await this.usersService.findOne((await this.usersService.findByUuid(uuid))?.id, ['sectors']);
        const role = await this.rolesService.findByName(accountUser.role);
        if (!role) {
            throw new common_1.NotFoundException('Tipo de usuário não encontrado');
        }
        if (!user) {
            throw new common_1.NotFoundException('Usuário não encontrado ao tentar atualizar.');
        }
        let jobPositionId;
        if (accountUser.job_position_uuid) {
            const jobPosition = await this.jobPositionsService.findByUuid(accountUser.job_position_uuid);
            if (!jobPosition) {
                throw new common_1.NotFoundException('Cargo não encontrado ao tentar atualizar o usuário.');
            }
            jobPositionId = jobPosition.id;
        }
        if (accountUser.sector_uuid) {
            const sector = await this.sectorsService.findOneWithAccountId(accountUser.sector_uuid, authUser.account_id);
            if (!sector) {
                throw new common_1.NotFoundException('Setor não encontrado ao tentar atualizar o usuário.');
            }
            user.sectors = [sector];
        }
        else {
        }
        const updateData = { ...accountUser };
        delete updateData.password;
        delete updateData.confirmPassword;
        delete updateData.sector_uuid;
        delete updateData.job_position_uuid;
        delete user.profile_img_url;
        Object.assign(user, updateData);
        user.role = role;
        if (accountUser.password && accountUser.password.trim() !== '') {
            const salt = (0, crypto_1.randomBytes)(8).toString('hex');
            const hashBuffer = (await scrypt(accountUser.password, salt, 32));
            user.password = salt + '.' + hashBuffer.toString('hex');
        }
        if (jobPositionId !== undefined) {
            user.job_position_id = jobPositionId;
        }
        if (accountUser.job_position_current_level_uuid !== undefined) {
            if (accountUser.job_position_current_level_uuid == null || accountUser.job_position_current_level_uuid === '') {
                user.jobPositionCurrentLevel = null;
            }
            else {
                const level = await this.jobPositionsLevelsService.findOneWithAccountId(accountUser.job_position_current_level_uuid, authUser.account_id);
                user.jobPositionCurrentLevel = level;
            }
        }
        await this.usersService.saveUser(user);
        return { uuid, role: { uuid: role.uuid } };
    }
    async updateAccountUserIsActive(uuid) {
        const user = await this.usersService.findByUuid(uuid);
        if (!user) {
            throw new common_1.NotFoundException('Usuário não encontrado ao tentar atualizar.');
        }
        try {
            await this.usersService.update(user.id, { ...user, is_active: !user.is_active });
            return true;
        }
        catch (error) {
            return false;
        }
    }
    async remove(id) {
        const account = await this.findOne(id);
        if (!account) {
            throw new common_1.NotFoundException('Conta não encontrada ao tentar remover.');
        }
        await this.accountRepository.remove(account);
    }
    async totalsAccountUsers(accountId) {
        const total = await this.usersService.countByAccountId(accountId);
        const pending_job_position_settings = await this.usersService.countWithoutJobPositionByAccountId(accountId);
        const userIdsWithEvaluations = await this.evaluationApplicationsService.findDistinctEvaluatedUserIdsByAccountId(accountId);
        const pending_evaluation_settings = await this.usersService.findUserIdsNotInListByAccountId(userIdsWithEvaluations, accountId);
        const userIdsWithCompletedResponses = await this.formResponsesService.findDistinctEvaluatedUserIdsWithCompletedResponsesByAccountId(accountId);
        const not_evaluated_yet = await this.usersService.findUserIdsNotInListByAccountId(userIdsWithCompletedResponses, accountId);
        return {
            total,
            pending_job_position_settings,
            pending_evaluation_settings,
            not_evaluated_yet,
        };
    }
};
exports.AccountsService = AccountsService;
exports.AccountsService = AccountsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(account_entity_1.Account)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource,
        system_modules_service_1.SystemModulesService,
        minio_service_1.MinioService,
        users_service_1.UsersService,
        roles_service_1.RolesService,
        job_positions_service_1.JobPositionService,
        job_positions_levels_service_1.JobPositionsLevelsService,
        sectors_service_1.SectorsService,
        evaluation_applications_service_1.EvaluationApplicationsService,
        form_responses_service_1.FormResponsesService])
], AccountsService);
//# sourceMappingURL=accounts.service.js.map