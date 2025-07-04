import { Strategy } from 'passport-jwt';
import { UsersService } from '../../users/users.service';
import { ConfigService } from '@nestjs/config';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private usersService;
    constructor(usersService: UsersService, configService: ConfigService);
    validate({ email }: {
        email: string;
    }): Promise<import("../../../entities/user.entity").User>;
}
export {};
