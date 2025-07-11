import { EntityManager, Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { UpdateUserDto } from './dtos/update-user.dto';
import { RolesTypes } from '../roles/dtos/roles-types.dto';
import { RolesService } from '../roles/roles.service';
import { GoogleProfileParsed } from '../auth/dtos/google-profile-parsed.dta';
import { AuthSignupDto } from '../auth/dtos/auth-signup';
import { UpdateUserPersonalInformationDto } from './dtos/update-user-personal-information.dto';
import { MinioService } from '@/minio/minio.service';
import { UpdateUserPersonalInformationResponseDto } from './dtos/update-user-personal-information-response.dto';
import { UpdateUserPasswordDto } from './dtos/update-user-password.dto';
import { CreateAccountUserDto } from '../accounts/dtos/create-account-user.dto';
export declare class UsersService {
    private userRepository;
    private readonly rolesService;
    private readonly minioService;
    constructor(userRepository: Repository<User>, rolesService: RolesService, minioService: MinioService);
    create(roleName: RolesTypes, controllerProfile?: AuthSignupDto, googleProfile?: GoogleProfileParsed, manager?: EntityManager): Promise<User>;
    createSecondaryUser(roleName: RolesTypes, accountUser: CreateAccountUserDto, account_id: number, manager?: EntityManager): Promise<User>;
    findOne(id: number, relations?: string[], manager?: EntityManager): Promise<User | undefined>;
    findByEmail(email: string, relations?: string[]): Promise<User | undefined>;
    findByUuid(uuid: string, select?: string[]): Promise<User>;
    findAndPaginateByAccountId(accountId: number, page: number, limit: number, sortColumn?: string, sortOrder?: 'asc' | 'desc', searchTerm?: string): Promise<[User[], number]>;
    update(id: number, body: UpdateUserDto, manager?: EntityManager): Promise<User>;
    updateUserPersonalInformations(uuid: string, body: UpdateUserPersonalInformationDto, file?: Express.Multer.File): Promise<UpdateUserPersonalInformationResponseDto>;
    updateUserPassword(uuid: string, body: UpdateUserPasswordDto, user: User): Promise<boolean>;
    remove(id: number): Promise<User>;
}
