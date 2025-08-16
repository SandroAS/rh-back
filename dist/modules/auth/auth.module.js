"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_module_1 = require("../users/users.module");
const jwt_strategy_1 = require("./strategies/jwt.strategy");
const google_strategy_1 = require("./strategies/google.strategy");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const config_1 = require("@nestjs/config");
const accounts_module_1 = require("../accounts/accounts.module");
const trials_module_1 = require("../trials/trials.module");
const passport_1 = require("@nestjs/passport");
const user_metas_module_1 = require("../user-metas/user-metas.module");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (configService) => ({
                    secret: configService.get('JWT_SECRET'),
                    signOptions: { expiresIn: '180d' },
                }),
            }),
            users_module_1.UsersModule,
            accounts_module_1.AccountsModule,
            trials_module_1.TrialsModule,
            passport_1.PassportModule,
            user_metas_module_1.UserMetasModule
        ],
        providers: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy, google_strategy_1.GoogleStrategy],
        exports: [auth_service_1.AuthService],
        controllers: [auth_controller_1.AuthController],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map