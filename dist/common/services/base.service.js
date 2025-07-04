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
exports.BaseService = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
let BaseService = class BaseService {
    constructor(repository) {
        this.repository = repository;
    }
    async create(data) {
        const newEntity = this.repository.create(data);
        return await this.repository.save(newEntity);
    }
    async findAndPaginate(pagination, searchColumns = [], additionalWhere) {
        const page = parseInt(pagination.page || '1', 10);
        const limit = parseInt(pagination.limit || '10', 10);
        const skip = (page - 1) * limit;
        const queryBuilder = this.repository.createQueryBuilder('entity');
        if (additionalWhere) {
            additionalWhere(queryBuilder);
        }
        if (pagination.search_term && searchColumns.length > 0) {
            const searchTerm = `%${pagination.search_term.toLowerCase()}%`;
            const whereConditions = searchColumns.map(col => `LOWER(entity.${col}) LIKE :searchTerm`).join(' OR ');
            queryBuilder.andWhere(`(${whereConditions})`, { searchTerm });
        }
        if (pagination.sort_column) {
            const orderByColumn = `entity.${pagination.sort_column}`;
            const sortOrder = pagination.sort_order === 'desc' ? 'DESC' : 'ASC';
            queryBuilder.orderBy(orderByColumn, sortOrder);
        }
        else {
            queryBuilder.orderBy('entity.created_at', 'DESC');
        }
        const [data, total] = await Promise.all([
            queryBuilder.offset(skip).limit(limit).getMany(),
            queryBuilder.getCount(),
        ]);
        const last_page = Math.ceil(total / limit);
        return {
            data,
            total,
            page,
            last_page,
            limit,
        };
    }
    async findAll(options) {
        return await this.repository.find(options);
    }
    async findById(id, options) {
        return await this.repository.findOne({
            where: { id: id },
            ...options
        });
    }
    async findByUuid(uuid, options) {
        return await this.repository.findOne({
            where: { uuid: uuid },
            ...options
        });
    }
    async findOne(options) {
        return await this.repository.findOne(options);
    }
    async update(id, data) {
        const entity = await this.findById(id);
        if (!entity) {
            throw new common_1.NotFoundException(`Entidade com ID ${id} não encontrada ao tentar atualizar.`);
        }
        Object.assign(entity, data);
        return await this.repository.save(entity);
    }
    async remove(id) {
        const entity = await this.findById(id);
        if (!entity) {
            throw new common_1.NotFoundException(`Entidade com ID ${id} não encontrada ao tentar deletar.`);
        }
        await this.repository.remove(entity);
        return true;
    }
    async updateByUuid(uuid, data, accountId) {
        const whereClause = { uuid: uuid };
        if (accountId) {
            whereClause.account_id = accountId;
        }
        const entity = await this.repository.findOne({ where: whereClause });
        if (!entity) {
            throw new common_1.NotFoundException(`Entidade com UUID "${uuid}" não encontrada ao tentar atualizar.`);
        }
        Object.assign(entity, data);
        return await this.repository.save(entity);
    }
    async removeByUuid(uuid, accountId) {
        const whereClause = { uuid: uuid };
        if (accountId) {
            whereClause.account_id = accountId;
        }
        const result = await this.repository.delete(whereClause);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Entidade com UUID "${uuid}" não encontrada ao tentar deletar.`);
        }
        return true;
    }
};
exports.BaseService = BaseService;
exports.BaseService = BaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], BaseService);
//# sourceMappingURL=base.service.js.map