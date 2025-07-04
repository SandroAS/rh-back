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
exports.GoogleStrategy = void 0;
const passport_1 = require("@nestjs/passport");
const passport_google_oauth20_1 = require("passport-google-oauth20");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const auth_service_1 = require("../auth.service");
const users_service_1 = require("../../users/users.service");
const string_utils_1 = require("../../../common/utils/string.utils");
let GoogleStrategy = class GoogleStrategy extends (0, passport_1.PassportStrategy)(passport_google_oauth20_1.Strategy, 'google') {
    constructor(configService, authService, usersService) {
        super({
            clientID: configService.get('GOOGLE_CLIENT_ID'),
            clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
            callbackURL: `${configService.get('APP_URL')}/auth/google/redirect`,
            scope: ['email', 'profile'],
        });
        this.configService = configService;
        this.authService = authService;
        this.usersService = usersService;
    }
    async validate(accessToken, refreshToken, profile, done) {
        try {
            const email = profile.emails[0].value;
            let userFoundByEmail = await this.usersService.findByEmail(email, ['account.lastTrial', 'account.systemModules', 'role.permissions', 'userMetas', 'companies.address']);
            const googleProfile = {
                google_id: profile.id,
                email,
                name: (0, string_utils_1.formatFullName)(profile.displayName),
                profile_img_url: profile.photos[0]?.value || null,
            };
            if (!userFoundByEmail) {
                const { user, accessToken } = await this.authService.signup(null, googleProfile);
                done(null, { user, accessToken });
            }
            else {
                if (!userFoundByEmail.google_id) {
                    await this.usersService.update(userFoundByEmail.id, {
                        google_id: profile.id,
                        profile_img_url: userFoundByEmail.profile_img_url || googleProfile.profile_img_url
                    }, null);
                    userFoundByEmail.google_id = profile.id;
                    userFoundByEmail.profile_img_url = userFoundByEmail.profile_img_url || googleProfile.profile_img_url;
                }
                const { user, accessToken } = await this.authService.login(email, null, googleProfile);
                done(null, { user, accessToken });
            }
        }
        catch (err) {
            console.error('Erro na estratégia Google:', err);
            done(new common_1.InternalServerErrorException('Falha na autenticação Google'), null);
        }
    }
};
exports.GoogleStrategy = GoogleStrategy;
exports.GoogleStrategy = GoogleStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        auth_service_1.AuthService,
        users_service_1.UsersService])
], GoogleStrategy);
//# sourceMappingURL=google.strategy.js.map