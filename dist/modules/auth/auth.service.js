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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const util_1 = require("util");
const data_source_1 = require("../../data-source");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const accounts_service_1 = require("../accounts/accounts.service");
const trials_service_1 = require("../trials/trials.service");
const auth_response_dto_1 = require("./dtos/auth-response.dto");
const user_entity_1 = require("../../entities/user.entity");
const class_transformer_1 = require("class-transformer");
const user_metas_service_1 = require("../user-metas/user-metas.service");
const user_metas_response_dto_1 = require("../user-metas/dtos/user-metas-response.dto");
const roles_types_dto_1 = require("../roles/dtos/roles-types.dto");
const system_module_entity_1 = require("../../entities/system-module.entity");
const scrypt = (0, util_1.promisify)(crypto_1.scrypt);
let AuthService = class AuthService {
    constructor(usersService, jwtService, accountsService, trialsService, userMetasService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.accountsService = accountsService;
        this.trialsService = trialsService;
        this.userMetasService = userMetasService;
    }
    async whoami(userId) {
        const user = await this.usersService.findOne(userId, ['account.lastTrial', 'account.systemModules', 'role.permissions', 'userMetas', 'companies.address']);
        if (!user) {
            throw new common_1.NotFoundException('Usuário não encontrado.');
        }
        const authResponse = new auth_response_dto_1.AuthResponseDto(user);
        return authResponse;
    }
    async signup(controllerProfile, googleProfile) {
        if (!controllerProfile && !googleProfile) {
            throw new common_1.BadRequestException('Senha ou perfil do Google são obrigatórios para cadastro.');
        }
        const existingUser = await this.usersService.findByEmail(controllerProfile?.email || googleProfile?.email);
        if (existingUser) {
            throw new common_1.BadRequestException('E-mail já está em uso, escolha outro.');
        }
        const queryRunner = data_source_1.default.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            let user;
            if (controllerProfile && !googleProfile) {
                const salt = (0, crypto_1.randomBytes)(8).toString('hex');
                const hashBuffer = (await scrypt(controllerProfile.password, salt, 32));
                controllerProfile.password = salt + '.' + hashBuffer.toString('hex');
                user = await this.usersService.create(roles_types_dto_1.RolesTypes.ADMIN, controllerProfile, null, queryRunner.manager);
                if (controllerProfile.termsAccepted) {
                    const termsOfService = await this.userMetasService.create(user.id, 'TERMS_OF_SERVICE', 'ACCEPTED', 'v1.0.0', queryRunner.manager);
                    const privacyPolicies = await this.userMetasService.create(user.id, 'PRIVACY_POLICIES', 'ACCEPTED', 'v1.0.0', queryRunner.manager);
                    user.userMetas = [termsOfService, privacyPolicies];
                }
            }
            else {
                user = await this.usersService.create(roles_types_dto_1.RolesTypes.ADMIN, null, googleProfile, queryRunner.manager);
            }
            const account = await this.accountsService.create({ admin_id: user.id }, queryRunner.manager);
            const started_at = new Date();
            const ended_at = new Date(started_at.getTime() + 7 * 24 * 60 * 60 * 1000);
            const trial = await this.trialsService.create({ account_id: account.id, started_at, ended_at }, queryRunner.manager);
            await this.accountsService.update(account.id, { last_trial_id: trial.id }, queryRunner.manager);
            await this.usersService.update(user.id, { account_id: account.id }, queryRunner.manager);
            let selectedModuleType;
            selectedModuleType = system_module_entity_1.SystemModuleName.CAREER_DEVELOPMENT;
            await queryRunner.commitTransaction();
            const authUser = (0, class_transformer_1.plainToInstance)(user_entity_1.User, {
                ...user,
                account: { ...account, lastTrial: trial }
            });
            const authResponse = new auth_response_dto_1.AuthResponseDto(authUser);
            const payload = { sub: authUser.id, email: authUser.email };
            const accessToken = this.jwtService.sign(payload);
            return { user: authResponse, accessToken };
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            throw new common_1.InternalServerErrorException('Erro ao realizar cadastro: ' + err.message);
        }
        finally {
            await queryRunner.release();
        }
    }
    async login(email, password, googleProfile) {
        const user = await this.usersService.findByEmail(email, ['account.lastTrial', 'account.systemModules', 'role.permissions', 'userMetas', 'companies.address']);
        if (!user) {
            throw new common_1.NotFoundException('Usuário não encontrado ao tentar logar.');
        }
        if (!password && !googleProfile) {
            throw new common_1.BadRequestException('Senha ou perfil do Google são obrigatórios para logar.');
        }
        if (password) {
            const [salt, storedHash] = user.password.split('.');
            const hash = (await scrypt(password, salt, 32));
            if (!salt || !storedHash) {
                throw new common_1.BadRequestException('Senha salva com formato inválido.');
            }
            if (storedHash !== hash.toString('hex')) {
                throw new common_1.BadRequestException('Senha com formato inválido.');
            }
            const hashedBuffer = (await scrypt(password, salt, 32));
            const storedBuffer = Buffer.from(storedHash, 'hex');
            const passwordsMatch = storedBuffer.length === hashedBuffer.length && (0, crypto_1.timingSafeEqual)(storedBuffer, hashedBuffer);
            if (!passwordsMatch) {
                throw new common_1.BadRequestException('Senha incorreta.');
            }
        }
        const payload = { sub: user.id, email: user.email };
        const accessToken = this.jwtService.sign(payload);
        const authResponse = new auth_response_dto_1.AuthResponseDto(user);
        return { user: authResponse, accessToken };
    }
    async termsAccepted(userUuid) {
        const user = await this.usersService.findByUuid(userUuid, ['id']);
        if (!user) {
            throw new common_1.NotFoundException('Usuário não encontrado ao tentar aprovar os Termos de Serviço e Políticas de Privacidade.');
        }
        const termsOfService = await this.userMetasService.create(user.id, 'TERMS_OF_SERVICE', 'ACCEPTED', 'v1.0.0');
        const privacyPolicies = await this.userMetasService.create(user.id, 'PRIVACY_POLICIES', 'ACCEPTED', 'v1.0.0');
        return [new user_metas_response_dto_1.UserMetasResponseDto(termsOfService), new user_metas_response_dto_1.UserMetasResponseDto(privacyPolicies)];
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        accounts_service_1.AccountsService,
        trials_service_1.TrialsService,
        user_metas_service_1.UserMetasService])
], AuthService);
//# sourceMappingURL=auth.service.js.map