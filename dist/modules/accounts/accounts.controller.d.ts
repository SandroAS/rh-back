import { AccountsService } from './accounts.service';
import { CreateAccountUserDto } from './dtos/create-account-user.dto';
import { UpdateAccountUserDto } from './dtos/update-account-user-dto';
import { PaginationDto } from '@/common/dtos/pagination.dto';
import { TotalsAccountUsersResponseDto } from './dtos/totals-account-users-response.dto';
export declare class AccountsController {
    private readonly accountsService;
    constructor(accountsService: AccountsService);
    createAccountUser(data: CreateAccountUserDto, req: any): Promise<{
        uuid: string;
        role: {
            uuid: string;
        };
    }>;
    findAllAccountUsers(req: any, pagination: PaginationDto): Promise<import("./dtos/account-users-response-pagination.dto").AccountUsersResponsePaginationDto>;
    updateAccountUser(uuid: string, data: UpdateAccountUserDto, req: any): Promise<{
        uuid: string;
        role: {
            uuid: string;
        };
    }>;
    updateAccountUserIsActive(uuid: string): Promise<boolean>;
    totalsAccountUsers(account_id: number): Promise<TotalsAccountUsersResponseDto>;
}
