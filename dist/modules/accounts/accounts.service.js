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
const data_source_1 = require("../../data-source");
const crypto_1 = require("crypto");
const util_1 = require("util");
const roles_types_dto_1 = require("../roles/dtos/roles-types.dto");
const roles_service_1 = require("../roles/roles.service");
const account_users_response_pagination_dto_1 = require("./dtos/account-users-response-pagination.dto");
const scrypt = (0, util_1.promisify)(crypto_1.scrypt);
let AccountsService = class AccountsService {
    constructor(accountRepository, systemModuleService, minioService, usersService, rolesService) {
        this.accountRepository = accountRepository;
        this.systemModuleService = systemModuleService;
        this.minioService = minioService;
        this.usersService = usersService;
        this.rolesService = rolesService;
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
        const savedAccount = await accountRepository.save(account);
        savedAccount.systemModules = account.systemModules;
        return savedAccount;
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
        const queryRunner = data_source_1.default.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const salt = (0, crypto_1.randomBytes)(8).toString('hex');
            const hashBuffer = (await scrypt(accountUser.password, salt, 32));
            accountUser.password = salt + '.' + hashBuffer.toString('hex');
            const account = await this.findOne(user.account_id, queryRunner.manager);
            const userCreated = await this.usersService.createSecondaryUser(roles_types_dto_1.RolesTypes[accountUser.role], accountUser, account.id, queryRunner.manager);
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
        const account = await this.accountRepository.findOne({ where: { id: user.account_id }, relations: ['users.role'] });
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
        return new account_users_response_pagination_dto_1.AccountUsersResponsePaginationDto({ data: usersWithPresignedUrls, total, page, last_page: lastPage, limit });
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
        const user = await this.usersService.findByUuid(uuid);
        const role = await this.rolesService.findByName(accountUser.role);
        if (!role) {
            throw new common_1.NotFoundException('Tipo de usuário não encontrado');
        }
        if (!user) {
            throw new common_1.NotFoundException('Usuário não encontrado ao tentar atualizar.');
        }
        Object.assign(user, accountUser);
        user.role = role;
        await this.usersService.update(user.id, { ...user });
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
};
exports.AccountsService = AccountsService;
exports.AccountsService = AccountsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(account_entity_1.Account)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        system_modules_service_1.SystemModulesService,
        minio_service_1.MinioService,
        users_service_1.UsersService,
        roles_service_1.RolesService])
], AccountsService);
//# sourceMappingURL=accounts.service.js.map