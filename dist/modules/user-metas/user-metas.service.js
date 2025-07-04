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
exports.UserMetasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_meta_entity_1 = require("../../entities/user-meta.entity");
let UserMetasService = class UserMetasService {
    constructor(userMetaRepository) {
        this.userMetaRepository = userMetaRepository;
    }
    async create(user, key, value, description, manager) {
        const user_id = typeof user === 'number' ? user : user.id;
        const userMetaRepository = manager ? manager.getRepository(user_meta_entity_1.UserMeta) : this.userMetaRepository;
        const userMeta = userMetaRepository.create({
            user_id,
            key,
            value,
            description,
        });
        return userMetaRepository.save(userMeta);
    }
    async findLatestUserMeta(user_id, key) {
        return this.userMetaRepository.findOne({
            where: { user_id, key },
            order: { created_at: 'DESC' },
        });
    }
    async findAllUserMetas(user_id) {
        return this.userMetaRepository.find({
            where: { user_id },
            order: { created_at: 'DESC' },
        });
    }
};
exports.UserMetasService = UserMetasService;
exports.UserMetasService = UserMetasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_meta_entity_1.UserMeta)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserMetasService);
//# sourceMappingURL=user-metas.service.js.map