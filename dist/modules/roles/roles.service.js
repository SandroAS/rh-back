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
exports.RolesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const role_entity_1 = require("../../entities/role.entity");
const permissions_service_1 = require("../permissions/permissions.service");
let RolesService = class RolesService {
    constructor(roleRepository, permissionsService) {
        this.roleRepository = roleRepository;
        this.permissionsService = permissionsService;
    }
    async findAll() {
        let roles = await this.roleRepository
            .createQueryBuilder('role')
            .where('role.name <> :name', { name: 'SUPER_ADMIN' })
            .leftJoinAndSelect('role.permissions', 'permission')
            .select([
            'role.uuid',
            'role.name',
            'permission.name',
        ])
            .getMany();
        return roles.map(role => {
            return { ...role, permissions: role.permissions.map(permission => permission.name) };
        });
    }
    async findAllWithPaginationOptimized(pagination) {
        const page = parseInt(pagination.page || '1', 10);
        const limit = parseInt(pagination.limit || '10', 10);
        const sortColumn = pagination.sort_column;
        let sortOrder = pagination.sort_order;
        const searchTerm = pagination.search_term;
        const skip = (page - 1) * limit;
        const queryBuilder = this.roleRepository
            .createQueryBuilder('role')
            .leftJoin('role.permissions', 'permission')
            .select([
            'role.uuid AS uuid',
            'role.name AS name',
            'role.created_at AS created_at',
        ]);
        queryBuilder.addSelect('GROUP_CONCAT(permission.name) AS permissionNames');
        queryBuilder.where('role.name <> :superAdminName', { superAdminName: 'SUPER_ADMIN' });
        if (searchTerm) {
            queryBuilder.andWhere(`(LOWER(role.name) LIKE LOWER(:searchTerm) OR 
          LOWER(role.uuid) LIKE LOWER(:searchTerm) OR 
          LOWER(permission.name) LIKE LOWER(:searchTerm))`, { searchTerm: `%${searchTerm}%` });
        }
        if (sortColumn) {
            let orderByColumn;
            switch (sortColumn) {
                case 'name':
                    orderByColumn = 'role.name';
                    break;
                case 'uuid':
                    orderByColumn = 'role.uuid';
                    break;
                case 'created_at':
                    orderByColumn = 'role.created_at';
                    break;
                case 'permissionNames':
                    orderByColumn = 'permissionNames';
                    break;
                default:
                    orderByColumn = 'role.created_at';
                    sortOrder = 'asc';
            }
            queryBuilder.orderBy(orderByColumn, sortOrder === 'desc' ? 'DESC' : 'ASC');
        }
        else {
            queryBuilder.orderBy('role.created_at', 'ASC');
        }
        queryBuilder.groupBy('role.uuid');
        queryBuilder.offset(skip).limit(limit);
        const countQueryBuilder = this.roleRepository
            .createQueryBuilder('role')
            .where('role.name <> :superAdminName', { superAdminName: 'SUPER_ADMIN' });
        if (searchTerm) {
            countQueryBuilder.leftJoin('role.permissions', 'permission');
            countQueryBuilder.andWhere(`(LOWER(role.name) LIKE LOWER(:searchTerm) OR 
          LOWER(role.uuid) LIKE LOWER(:searchTerm) OR 
          LOWER(permission.name) LIKE LOWER(:searchTerm))`, { searchTerm: `%${searchTerm}%` });
        }
        const [data, total] = await Promise.all([
            queryBuilder.getRawMany(),
            countQueryBuilder.getCount(),
        ]);
        const mappedData = data.map(row => ({
            id: row.id,
            uuid: row.uuid,
            name: row.name,
            created_at: row.created_at,
            permissions: row.permissionNames ? String(row.permissionNames).split(',') : [],
        }));
        const last_page = Math.ceil(total / limit);
        return {
            data: mappedData,
            total,
            page,
            last_page,
            limit,
        };
    }
    async findByName(name, manager) {
        const roleRepository = manager ? manager.getRepository(role_entity_1.Role) : this.roleRepository;
        const role = await roleRepository
            .createQueryBuilder('role')
            .where('role.name = :name', { name })
            .leftJoinAndSelect('role.permissions', 'permission')
            .select([
            'role.id',
            'role.uuid',
            'role.name',
            'permission.name',
        ])
            .getOne();
        if (!role) {
            return undefined;
        }
        if (role.permissions && role.permissions.length > 0) {
            role.permissions = role.permissions.map(permission => {
                return permission.name;
            });
            return role;
        }
        role.permissions = [];
        return role;
    }
    findOne(id) {
        return this.roleRepository.findOne({ where: { id }, relations: ['permissions'] });
    }
    async assignPermissions(roleId, permissionIds) {
        const role = await this.roleRepository.findOne({ where: { id: roleId }, relations: ['permissions'] });
        if (!role) {
            throw new common_1.NotFoundException('Tipo de usuário não encontrado.');
        }
        const permissions = await this.permissionsService.findByIds(permissionIds);
        role.permissions = permissions;
        return this.roleRepository.save(role);
    }
};
exports.RolesService = RolesService;
exports.RolesService = RolesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        permissions_service_1.PermissionsService])
], RolesService);
//# sourceMappingURL=roles.service.js.map