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
exports.PermissionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const permission_entity_1 = require("../../entities/permission.entity");
let PermissionsService = class PermissionsService {
    constructor(permissionRepository) {
        this.permissionRepository = permissionRepository;
    }
    async findAll() {
        return this.permissionRepository.find();
    }
    async findAllArrayOfStrings() {
        let permissions = await this.permissionRepository
            .createQueryBuilder('permission')
            .select(['permission.name'])
            .getMany();
        return permissions.map(permission => permission.name);
    }
    async findOne(id) {
        const permission = await this.permissionRepository.findOneBy({ id });
        if (!permission) {
            throw new common_1.NotFoundException(`Permission with id ${id} not found`);
        }
        return permission;
    }
    async findByIds(ids) {
        if (!ids || ids.length === 0) {
            return [];
        }
        return this.permissionRepository.findBy({ id: (0, typeorm_2.In)(ids) });
    }
    async create(data) {
        const permission = this.permissionRepository.create(data);
        return this.permissionRepository.save(permission);
    }
    async update(id, data) {
        const permission = await this.findOne(id);
        Object.assign(permission, data);
        return this.permissionRepository.save(permission);
    }
    async remove(id) {
        const permission = await this.findOne(id);
        await this.permissionRepository.remove(permission);
    }
};
exports.PermissionsService = PermissionsService;
exports.PermissionsService = PermissionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(permission_entity_1.Permission)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PermissionsService);
//# sourceMappingURL=permissions.service.js.map