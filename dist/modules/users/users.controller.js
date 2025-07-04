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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const update_user_personal_information_dto_1 = require("./dtos/update-user-personal-information.dto");
const platform_express_1 = require("@nestjs/platform-express");
const update_user_password_dto_1 = require("./dtos/update-user-password.dto");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async findUser(id) {
        const user = await this.usersService.findOne(parseInt(id));
        if (!user) {
            throw new common_1.NotFoundException('user not found');
        }
        return user;
    }
    findAllUsers(email) {
        return this.usersService.findByEmail(email);
    }
    async updateUserPersonalInformations(uuid, body, file) {
        if (body.gender !== null && body.gender !== undefined && body.gender !== 'MALE' && body.gender !== 'FEMALE') {
            body.gender = null;
        }
        return await this.usersService.updateUserPersonalInformations(uuid, body, file);
    }
    async updateUserPassword(uuid, body, req) {
        const user = req.user;
        return await this.usersService.updateUserPassword(uuid, body, user);
    }
    async removeUser(id) {
        return this.usersService.remove(parseInt(id));
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)('/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findUser", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Query)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findAllUsers", null);
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('profile_image', {
        limits: { fileSize: 5 * 1024 * 1024 },
        fileFilter: (req, file, cb) => {
            if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
                return cb(new common_1.BadRequestException('Apenas arquivos de imagem (jpg, jpeg, png, gif) são permitidos!'), false);
            }
            cb(null, true);
        },
    })),
    (0, common_1.Put)('/personal-information/:uuid'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('uuid')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_personal_information_dto_1.UpdateUserPersonalInformationDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUserPersonalInformations", null);
__decorate([
    (0, common_1.Put)('/password/:uuid'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('uuid')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_password_dto_1.UpdateUserPasswordDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUserPassword", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "removeUser", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map