import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { AccountsService } from '../accounts/accounts.service';
import { TrialsService } from '../trials/trials.service';
import { AuthResponseDto } from './dtos/auth-response.dto';
import { GoogleProfileParsed } from './dtos/google-profile-parsed.dta';
import { AuthSignupDto } from './dtos/auth-signup';
import { UserMetasService } from '../user-metas/user-metas.service';
import { UserMetasResponseDto } from '../user-metas/dtos/user-metas-response.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class AuthService {
    private usersService;
    private jwtService;
    private readonly accountsService;
    private readonly trialsService;
    private readonly userMetasService;
    private readonly eventEmitter;
    constructor(usersService: UsersService, jwtService: JwtService, accountsService: AccountsService, trialsService: TrialsService, userMetasService: UserMetasService, eventEmitter: EventEmitter2);
    whoami(userId: number): Promise<AuthResponseDto>;
    signup(controllerProfile?: AuthSignupDto, googleProfile?: GoogleProfileParsed): Promise<{
        user: AuthResponseDto;
        accessToken: string;
    }>;
    login(email: string, password?: string, googleProfile?: GoogleProfileParsed): Promise<{
        user: AuthResponseDto;
        accessToken: string;
    }>;
    termsAccepted(userUuid: string): Promise<UserMetasResponseDto[]>;
}
