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
exports.SystemModulesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const system_module_entity_1 = require("../../entities/system-module.entity");
let SystemModulesService = class SystemModulesService {
    constructor(systemModuleRepository) {
        this.systemModuleRepository = systemModuleRepository;
    }
    async create(name) {
        const newModule = this.systemModuleRepository.create({ name });
        return this.systemModuleRepository.save(newModule);
    }
    async findAll(select) {
        return this.systemModuleRepository.find({ select });
    }
    async findOneById(id) {
        return this.systemModuleRepository.findOne({ where: { id } });
    }
    async findOneByUuid(uuid, manager) {
        const repository = manager ? manager.getRepository(system_module_entity_1.SystemModule) : this.systemModuleRepository;
        return this.systemModuleRepository.findOne({ where: { uuid } });
    }
    async findByName(name, manager) {
        const repository = manager ? manager.getRepository(system_module_entity_1.SystemModule) : this.systemModuleRepository;
        return repository.findOne({ where: { name } });
    }
    async findOneByName(name) {
        return this.systemModuleRepository.findOne({ where: { name } });
    }
    async update(id, newName) {
        const moduleToUpdate = await this.findOneById(id);
        if (!moduleToUpdate) {
            throw new common_1.NotFoundException(`SystemModule com ID ${id} não encontrado.`);
        }
        moduleToUpdate.name = newName;
        return this.systemModuleRepository.save(moduleToUpdate);
    }
    async remove(id) {
        const result = await this.systemModuleRepository.delete(id);
        return result.affected > 0;
    }
};
exports.SystemModulesService = SystemModulesService;
exports.SystemModulesService = SystemModulesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(system_module_entity_1.SystemModule)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SystemModulesService);
//# sourceMappingURL=system-modules.service.js.map