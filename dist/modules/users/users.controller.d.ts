import { UsersService } from './users.service';
import { UpdateUserPersonalInformationDto } from './dtos/update-user-personal-information.dto';
import { UpdateUserPersonalInformationResponseDto } from './dtos/update-user-personal-information-response.dto';
import { UpdateUserPasswordDto } from './dtos/update-user-password.dto';
import { UserTeamResponseDto } from './dtos/user-team-response.dto';
import { UserResponseDto } from './dtos/user-response.dto';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    findAllAccountUsers(account_id: number): Promise<import("./dtos/user-avatar-response.dto").UserAvatarResponseDto[]>;
    findOneUserPanel(uuid: string, account_id: number): Promise<UserResponseDto>;
    findAllAccountUsersWithTeams(account_id: number): Promise<UserTeamResponseDto[]>;
    updateUserPersonalInformations(uuid: string, body: UpdateUserPersonalInformationDto, file?: Express.Multer.File): Promise<UpdateUserPersonalInformationResponseDto>;
    updateUserPassword(uuid: string, body: UpdateUserPasswordDto, req: any): Promise<boolean>;
}
