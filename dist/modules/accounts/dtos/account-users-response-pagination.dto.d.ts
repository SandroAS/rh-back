import { UserResponseDto } from '@/modules/users/dtos/user.response.dto';
import { User } from '@/entities/user.entity';
export declare class AccountUsersResponsePaginationDto {
    total: number;
    page: number;
    last_page: number;
    limit: number;
    users: UserResponseDto[];
    constructor(accountUsers: {
        data: User[];
        total: number;
        page: number;
        last_page: number;
        limit: number;
    });
}
