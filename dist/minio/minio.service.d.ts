import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '@/entities/user.entity';
export declare class MinioService implements OnModuleInit {
    private readonly configService;
    private readonly minioClient;
    private readonly externalMinioClient;
    private readonly logger;
    private readonly minioPort;
    private readonly minioUseSSL;
    private readonly minioAccessKey;
    private readonly minioSecretKey;
    private readonly minioRegion;
    private readonly minioBucketName;
    private readonly minioInternalEndpoint;
    private readonly minioExternalEndpoint;
    constructor(configService: ConfigService);
    onModuleInit(): Promise<void>;
    private testMinioConnectivity;
    private createBucketIfNotExists;
    uploadFile(file: Express.Multer.File, folder?: string): Promise<string>;
    getPresignedUrl(objectName: string, expirySeconds?: number): Promise<string>;
    processProfileImageUrl(profileImgUrl: string | null): Promise<string | null>;
    processUsersWithPresignedUrls(users: User[]): Promise<User[]>;
    removeFile(objectName: string): Promise<void>;
}
