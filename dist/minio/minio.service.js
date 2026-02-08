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
var MinioService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinioService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const Minio = require("minio");
const path = require("path");
const crypto = require("crypto");
let MinioService = MinioService_1 = class MinioService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(MinioService_1.name);
        this.minioPort = parseInt(this.configService.get('MINIO_PORT', '9000'), 10);
        this.minioUseSSL = this.configService.get('MINIO_USE_SSL') === 'true';
        this.minioAccessKey = this.configService.get('MINIO_ROOT_USER');
        this.minioSecretKey = this.configService.get('MINIO_ROOT_PASSWORD');
        this.minioRegion = this.configService.get('MINIO_REGION', 'us-east-1');
        this.minioBucketName = this.configService.get('MINIO_BUCKET');
        this.minioInternalEndpoint = this.configService.get('MINIO_ENDPOINT');
        this.minioExternalEndpoint =
            this.configService.get('MINIO_EXTERNAL_ENDPOINT') ||
                this.configService.get('APP_HOST') ||
                '127.0.0.1';
        if (!this.minioAccessKey || !this.minioSecretKey || !this.minioBucketName ||
            !this.minioInternalEndpoint) {
            this.logger.error('Missing one or more MinIO environment variables. Please check your .env file.');
            throw new Error('MinIO configuration incomplete.');
        }
        const minioClientConfig = {
            port: this.minioPort,
            useSSL: this.minioUseSSL,
            accessKey: this.minioAccessKey,
            secretKey: this.minioSecretKey,
            region: this.minioRegion
        };
        this.minioClient = new Minio.Client({
            endPoint: this.minioInternalEndpoint,
            ...minioClientConfig
        });
        this.externalMinioClient = new Minio.Client({
            endPoint: this.minioExternalEndpoint,
            ...minioClientConfig
        });
        this.logger.log(`MinIO Internal Endpoint: ${this.minioInternalEndpoint}:${this.minioPort}`);
        this.logger.log(`MinIO External Endpoint: ${this.minioExternalEndpoint}:${this.minioPort}`);
        this.logger.log(`MinIO Bucket: ${this.minioBucketName}`);
    }
    async onModuleInit() {
        await this.createBucketIfNotExists();
        await this.testMinioConnectivity();
    }
    async testMinioConnectivity() {
        try {
            const internalBucketExists = await this.minioClient.bucketExists(this.minioBucketName);
            this.logger.log(`MinIO Internal Connection: ${internalBucketExists ? 'OK' : 'FAILED'}`);
            try {
                const externalBucketExists = await this.externalMinioClient.bucketExists(this.minioBucketName);
                this.logger.log(`MinIO External Connection: ${externalBucketExists ? 'OK' : 'FAILED'}`);
            }
            catch (externalErr) {
                this.logger.warn(`MinIO External Connection failed: ${externalErr.message}`);
                this.logger.warn(`This is normal if MinIO is only accessible internally. External URLs may not work.`);
            }
        }
        catch (err) {
            this.logger.error(`MinIO connectivity test failed: ${err.message}`);
        }
    }
    async createBucketIfNotExists() {
        try {
            const bucketExists = await this.minioClient.bucketExists(this.minioBucketName);
            if (!bucketExists) {
                await this.minioClient.makeBucket(this.minioBucketName, this.minioRegion);
                this.logger.log(`Bucket '${this.minioBucketName}' created successfully in region '${this.minioRegion}'.`);
            }
            else {
                this.logger.log(`Bucket '${this.minioBucketName}' already exists.`);
            }
        }
        catch (err) {
            this.logger.error(`Error trying to create/check bucket '${this.minioBucketName}'. Error: '${err}'`);
            throw new common_1.InternalServerErrorException('Error creating/checking MinIO bucket.');
        }
    }
    async uploadFile(file, folder = 'general') {
        const fileExtension = path.extname(file.originalname);
        const uniqueFileName = `${crypto.randomBytes(16).toString('hex')}${fileExtension}`;
        const objectName = folder ? `${folder}/${uniqueFileName}` : uniqueFileName;
        try {
            await this.minioClient.putObject(this.minioBucketName, objectName, file.buffer, file.size, {
                'Content-Type': file.mimetype,
            });
            this.logger.log(`File '${objectName}' uploaded successfully to bucket '${this.minioBucketName}'.`);
            return objectName;
        }
        catch (err) {
            this.logger.error(`Error uploading file '${file.originalname}' to MinIO. Error: '${err}'`);
            throw new common_1.InternalServerErrorException('Error uploading file.');
        }
    }
    async getPresignedUrl(objectName, expirySeconds = 7 * 24 * 60 * 60) {
        if (!objectName) {
            return null;
        }
        try {
            const url = await this.externalMinioClient.presignedGetObject(this.minioBucketName, objectName, expirySeconds);
            return url;
        }
        catch (err) {
            this.logger.error(`Error generating presigned URL for '${objectName}': ${err.message}`);
            throw new common_1.InternalServerErrorException('Error generating presigned URL.');
        }
    }
    async processUsersWithPresignedUrls(users) {
        const processedUsers = await Promise.all(users.map(async (user) => {
            if (user.profile_img_url && !user.profile_img_url.includes('googleusercontent')) {
                try {
                    user.profile_img_url = await this.getPresignedUrl(user.profile_img_url);
                }
                catch (err) {
                    this.logger.error(`Falha ao tentar gerar URL assinada para imagem '${user.profile_img_url}' (usuário UUID: ${user.uuid}): ${err.message}`);
                    user.profile_img_url = null;
                }
            }
            return user;
        }));
        return processedUsers;
    }
    async removeFile(objectName) {
        try {
            await this.minioClient.removeObject(this.minioBucketName, objectName);
            this.logger.log(`File '${objectName}' removed successfully from bucket '${this.minioBucketName}'.`);
        }
        catch (error) {
            this.logger.error(`Error removing file '${objectName}' from MinIO: ${error.message}`);
            throw new common_1.InternalServerErrorException('Error removing file.');
        }
    }
};
exports.MinioService = MinioService;
exports.MinioService = MinioService = MinioService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], MinioService);
//# sourceMappingURL=minio.service.js.map