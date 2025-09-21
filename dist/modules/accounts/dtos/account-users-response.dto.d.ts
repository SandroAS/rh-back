import { Account } from '@/entities/account.entity';
import { UserResponseDto } from '@/modules/users/dtos/user-response.dto';
export declare class AccountUsersResponseDto {
    users: UserResponseDto[];
    constructor(account: Account);
}
