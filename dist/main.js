"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const data_source_1 = require("./data-source");
const run_seeders_1 = require("./seeds/run-seeders");
const profile_image_url_interceptor_1 = require("./interceptors/profile-image-url.interceptor");
async function bootstrap() {
    console.log('Envirement: ', process.env.NODE_ENV);
    await data_source_1.default.initialize();
    console.log('Database connected.');
    await data_source_1.default.runMigrations();
    console.log('Migrations executed.');
    await (0, run_seeders_1.runSeeders)();
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: ['http://localhost:5173', 'http://localhost:8081'],
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true, whitelist: true }));
    app.setGlobalPrefix('api');
    app.useGlobalInterceptors(new common_1.ClassSerializerInterceptor(app.get(core_1.Reflector)));
    app.useGlobalInterceptors(new profile_image_url_interceptor_1.ProfileImageUrlInterceptor());
    await app.listen(3000);
    console.log('Application is running on http://localhost:3000');
}
bootstrap();
//# sourceMappingURL=main.js.map