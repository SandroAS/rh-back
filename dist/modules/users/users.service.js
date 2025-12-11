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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const user_entity_1 = require("../../entities/user.entity");
const crypto_1 = require("crypto");
const util_1 = require("util");
const roles_service_1 = require("../roles/roles.service");
const minio_service_1 = require("../../minio/minio.service");
const user_avatar_response_dto_1 = require("./dtos/user-avatar-response.dto");
const scrypt = (0, util_1.promisify)(crypto_1.scrypt);
let UsersService = class UsersService {
    constructor(userRepository, rolesService, minioService) {
        this.userRepository = userRepository;
        this.rolesService = rolesService;
        this.minioService = minioService;
    }
    async create(roleName, controllerProfile, googleProfile, manager) {
        const userRepository = manager ? manager.getRepository(user_entity_1.User) : this.userRepository;
        const role = await this.rolesService.findByName(roleName);
        if (!role) {
            throw new common_1.NotFoundException('Tipo de usuário não encontrado');
        }
        let user;
        if (googleProfile) {
            const { google_id, email, name, profile_img_url } = googleProfile;
            user = userRepository.create({ role, email, google_id, name, profile_img_url });
        }
        else {
            if (!controllerProfile) {
                throw new common_1.BadRequestException('A senha é obrigatória para cadastro sem ser por autenticação com Google.');
            }
            const { email, password, name, cellphone, cpf } = controllerProfile;
            user = userRepository.create({ role, email, password, name, cellphone, cpf });
        }
        user.role.permissions = role.permissions;
        return userRepository.save(user);
    }
    async createSecondaryUser(roleName, accountUser, account_id, manager) {
        const userRepository = manager ? manager.getRepository(user_entity_1.User) : this.userRepository;
        const role = await this.rolesService.findByName(roleName);
        if (!role) {
            throw new common_1.NotFoundException('Tipo de usuário não encontrado');
        }
        const { email, password, name, cellphone, cpf } = accountUser;
        const user = userRepository.create({ role, email, password, name, cellphone, cpf, account_id });
        return userRepository.save(user);
    }
    async findOne(id, relations, manager) {
        const userRepository = manager ? manager.getRepository(user_entity_1.User) : this.userRepository;
        let user;
        if (relations && relations.length > 0) {
            user = await userRepository.findOne({
                where: { id },
                relations,
            });
        }
        else {
            user = await userRepository.findOne({ where: { id } });
        }
        if (user.profile_img_url && !user.profile_img_url.includes('googleusercontent')) {
            try {
                user.profile_img_url = await this.minioService.getPresignedUrl(user.profile_img_url);
            }
            catch (err) {
                this.minioService['logger'].error(`Falha ao tentar gerar url assinada para usuário, image '${user.profile_img_url}': ${err.message}`);
                user.profile_img_url = null;
            }
        }
        if (relations?.includes('role.permissions') && user.role?.permissions) {
            user.role.permissions = user.role.permissions.map(permission => {
                return permission.name;
            });
        }
        return user;
    }
    async findByEmail(email, relations) {
        if (relations && relations.length > 0) {
            let user;
            user = await this.userRepository.findOne({
                where: { email },
                relations,
            });
            if (user?.profile_img_url && !user.profile_img_url.includes('googleusercontent')) {
                try {
                    user.profile_img_url = await this.minioService.getPresignedUrl(user.profile_img_url);
                }
                catch (err) {
                    this.minioService['logger'].error(`Falha ao tentar gerar url assinada para usuário, image '${user.profile_img_url}': ${err.message}`);
                    user.profile_img_url = null;
                }
            }
            if (relations.includes('role.permissions') && user?.role?.permissions) {
                user.role.permissions = user.role.permissions.map(permission => {
                    return permission.name;
                });
            }
            return user;
        }
        return this.userRepository.findOne({ where: { email }, relations: relations || [] });
    }
    async findByUuid(uuid, select) {
        let user = this.userRepository
            .createQueryBuilder('user')
            .where('user.uuid = :uuid', { uuid });
        if (select) {
            select = select.map(columnName => `user.${columnName}`);
            user.select(select);
        }
        return await user.getOne();
    }
    async findByUuidsAndAccountId(uuids, account_id) {
        const users = await this.userRepository.find({
            where: { uuid: (0, typeorm_1.In)(uuids), account_id },
            select: ['id', 'uuid', 'account_id'],
        });
        if (users.length !== uuids.length) {
            const foundUuids = users.map(user => user.uuid);
            const notFoundUuids = uuids.filter(uuid => !foundUuids.includes(uuid));
            throw new common_1.NotFoundException(`Usuário(s) com UUID(s) "${notFoundUuids.join(', ')}" não encontrado(s) para a sua conta.`);
        }
        return users;
    }
    async findOneByUuidAndAccountId(uuid, account_id) {
        const user = await this.userRepository.findOne({
            where: { uuid, account_id },
            select: ['id', 'uuid', 'name', 'profile_img_url'],
        });
        return user;
    }
    async findAndPaginateByAccountId(accountId, page, limit, sortColumn, sortOrder, searchTerm) {
        const queryBuilder = this.userRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.role', 'role')
            .where('user.account_id = :accountId', { accountId });
        if (searchTerm) {
            queryBuilder.andWhere(`(LOWER(user.name) LIKE LOWER(:searchTerm) OR 
          LOWER(user.email) LIKE LOWER(:searchTerm) OR 
          LOWER(user.cellphone) LIKE LOWER(:searchTerm) OR 
          LOWER(role.name) LIKE LOWER(:searchTerm))`, { searchTerm: `%${searchTerm}%` });
        }
        if (sortColumn) {
            let orderByColumn;
            switch (sortColumn) {
                case 'name':
                    orderByColumn = 'user.name';
                    break;
                case 'email':
                    orderByColumn = 'user.email';
                    break;
                case 'cellphone':
                    orderByColumn = 'user.cellphone';
                    break;
                case 'role.name':
                    orderByColumn = 'role.name';
                    break;
                case 'is_active':
                    orderByColumn = 'user.is_active';
                    break;
                default:
                    orderByColumn = 'user.created_at';
                    sortOrder = 'asc';
            }
            queryBuilder.orderBy(orderByColumn, sortOrder === 'desc' ? 'DESC' : 'ASC');
        }
        else {
            queryBuilder.orderBy('user.created_at', 'ASC');
        }
        const skip = (page - 1) * limit;
        queryBuilder.skip(skip).take(limit);
        return await queryBuilder.getManyAndCount();
    }
    async findAllAccountUsers(account_id) {
        const users = await this.userRepository.find({ where: { account_id }, select: ['uuid', 'name', 'profile_img_url'], loadEagerRelations: false });
        const usersMapped = await Promise.all(users.map(async (user) => {
            if (user?.profile_img_url && !user.profile_img_url.includes('googleusercontent')) {
                try {
                    user.profile_img_url = await this.minioService.getPresignedUrl(user.profile_img_url);
                }
                catch (err) {
                    this.minioService['logger'].error(`Falha ao tentar gerar url assinada para usuário, image '${user.profile_img_url}': ${err.message}`);
                    user.profile_img_url = null;
                }
            }
            return new user_avatar_response_dto_1.UserAvatarResponseDto(user);
        }));
        return usersMapped;
    }
    async findAllAccountUsersWithTeams(account_id) {
        console.log(`[DEBUG - UserService] Buscando usuários para account_id: ${account_id}`);
        if (!account_id || isNaN(Number(account_id))) {
            console.error(`[ERROR - UserService] account_id inválido (${account_id}).`);
            throw new common_1.BadRequestException(`O ID da conta fornecido é inválido: ${account_id}.`);
        }
        const accountIdNumber = Number(account_id);
        console.log(`[DEBUG - UserService] account_id final para query: ${accountIdNumber}`);
        try {
            const users = await this.userRepository.find({
                where: { account_id: accountIdNumber },
                relations: [
                    'teamMembers',
                    'teamMembers.team',
                    'teamMembers.team.leader',
                    'teamMembers.team.teamMembers',
                    'teamMembers.team.teamMembers.user'
                ],
                select: [
                    'uuid',
                    'name',
                    'profile_img_url',
                ],
                loadEagerRelations: false
            });
            const usersWithTreatedImages = await Promise.all(users.map(async (user) => {
                if (user?.profile_img_url && !user.profile_img_url.includes('googleusercontent')) {
                    try {
                        user.profile_img_url = await this.minioService.getPresignedUrl(user.profile_img_url);
                    }
                    catch (err) {
                        console.error(`[MINIO ERROR] Falha ao tentar gerar url assinada para usuário, image '${user.profile_img_url}': ${err.message}`);
                        user.profile_img_url = null;
                    }
                }
                return user;
            }));
            return usersWithTreatedImages;
        }
        catch (err) {
            console.error(`[DB ERROR] Erro no banco de dados ao buscar usuários e seus times: ${err.message}`, err.stack);
            throw new common_1.InternalServerErrorException("Ocorreu um erro inesperado ao buscar os usuários e seus times.");
        }
    }
    async update(id, body, manager) {
        const userRepository = manager ? manager.getRepository(user_entity_1.User) : this.userRepository;
        const user = await this.findOne(id, ['account'], manager);
        if (!user) {
            throw new common_1.NotFoundException('Usuário não encontrado ao tentar atualizar.');
        }
        if (body.password) {
            const salt = (0, crypto_1.randomBytes)(8).toString('hex');
            const hash = (await scrypt(body.password, salt, 32));
            body.password = salt + '.' + hash.toString('hex');
        }
        else {
            delete body.password;
        }
        Object.assign(user, body);
        return userRepository.save(user);
    }
    async updateUserPersonalInformations(uuid, body, file) {
        const user = await this.findByUuid(uuid);
        if (!user) {
            throw new common_1.NotFoundException('Usuário não encontrado ao tentar atualizar informações pessoais.');
        }
        let newImageUrl = null;
        let newProfileObjectName = null;
        if (file) {
            if (user.profile_img_url && !user.profile_img_url.includes('googleusercontent')) {
                try {
                    await this.minioService.removeFile(user.profile_img_url);
                }
                catch (removeError) {
                    console.error(`Failed to remove old profile image '${user.profile_img_url}': ${removeError.message}`);
                }
            }
            newProfileObjectName = await this.minioService.uploadFile(file, 'profile-images');
            newImageUrl = await this.minioService.getPresignedUrl(newProfileObjectName);
        }
        else {
            if (user.profile_img_url && !user.profile_img_url.includes('googleusercontent')) {
                newProfileObjectName = user.profile_img_url;
                newImageUrl = await this.minioService.getPresignedUrl(newProfileObjectName);
            }
        }
        user.profile_img_url = newProfileObjectName;
        Object.assign(user, body);
        await this.userRepository.save(user);
        return { profile_img_url: newImageUrl };
    }
    async updateUserPassword(uuid, body, user) {
        try {
            if (user.password) {
                const [salt, storedHash] = user.password.split('.');
                const hashedBuffer = (await scrypt(body.current_password, salt, 32));
                const storedBuffer = Buffer.from(storedHash, 'hex');
                const passwordsMatch = storedBuffer.length === hashedBuffer.length && (0, crypto_1.timingSafeEqual)(storedBuffer, hashedBuffer);
                if (!passwordsMatch) {
                    throw new common_1.BadRequestException('Senha atual cadastrada não conincide com a senha atual informada.');
                }
            }
            const salt = (0, crypto_1.randomBytes)(8).toString('hex');
            const hash = (await scrypt(body.new_password, salt, 32));
            user.password = salt + '.' + hash.toString('hex');
            Object.assign(user, body);
            await this.userRepository.save(user);
            return true;
        }
        catch (err) {
            console.error(err);
            return false;
        }
    }
    async remove(id) {
        const user = await this.findOne(id);
        if (!user) {
            throw new common_1.NotFoundException('Usuário não encontrado ao tentar remover.');
        }
        return this.userRepository.remove(user);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        roles_service_1.RolesService,
        minio_service_1.MinioService])
], UsersService);
//# sourceMappingURL=users.service.js.map