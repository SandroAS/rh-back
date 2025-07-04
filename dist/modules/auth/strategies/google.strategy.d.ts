import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { UsersService } from '@/modules/users/users.service';
import { GoogleProfile } from '../dtos/google-profile.dta';
declare const GoogleStrategy_base: new (...args: any[]) => Strategy;
export declare class GoogleStrategy extends GoogleStrategy_base {
    private configService;
    private authService;
    private usersService;
    constructor(configService: ConfigService, authService: AuthService, usersService: UsersService);
    validate(accessToken: string, refreshToken: string, profile: GoogleProfile, done: VerifyCallback): Promise<any>;
}
export {};
