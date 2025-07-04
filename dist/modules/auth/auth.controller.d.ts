import { AuthService } from './auth.service';
import { LoginDto } from 'src/modules/users/dtos/login.dto';
import { User } from 'src/entities/user.entity';
import { Request, Response } from 'express';
import { AuthResponseDto } from './dtos/auth-response.dto';
import { ConfigService } from '@nestjs/config';
import { AuthSignupDto } from './dtos/auth-signup';
import { UserMetasResponseDto } from '../user-metas/dtos/user-metas-response.dto';
export declare class AuthController {
    private authService;
    private configService;
    constructor(authService: AuthService, configService: ConfigService);
    whoAmI(user: User): Promise<AuthResponseDto>;
    createUser(body: AuthSignupDto): Promise<{
        user: AuthResponseDto;
        accessToken: string;
    }>;
    login(body: LoginDto): Promise<{
        user: AuthResponseDto;
        accessToken: string;
    }>;
    logout(session: any): {
        message: string;
    };
    googleAuth(req: Request): Promise<void>;
    googleAuthRedirect(req: Request, res: Response): Promise<void>;
    termsAccepted(body: {
        userUuid: string;
    }): Promise<UserMetasResponseDto[]>;
}
