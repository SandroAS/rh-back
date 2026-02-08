import { Controller, Get, Post, Body, Param, Patch, UseGuards, Request, Put, Query } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '@/entities/user.entity';
import { CreateAccountUserDto } from './dtos/create-account-user.dto';
import { UpdateAccountUserDto } from './dtos/update-account-user-dto';
import { PaginationDto } from '@/common/dtos/pagination.dto';
import { TotalsAccountUsersResponseDto } from './dtos/totals-account-users-response.dto';
import { AccountId } from '@/common/decorators/account-id.decorator';

@Controller('account')
@UseGuards(JwtAuthGuard)
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post('users')
  createAccountUser(@Body() data: CreateAccountUserDto, @Request() req) {
    const user: User = req.user;
    return this.accountsService.createAccountUser(data, user);
  }

  @Get('pagination')
  findAllAccountUsers(@Request() req, @Query() pagination: PaginationDto) {
    const user: User = req.user as User;
    return this.accountsService.findAllAccountUsersWithPagination(user, pagination);
  }

  @Put('users/:uuid')
  updateAccountUser(@Param('uuid') uuid: string, @Body() data: UpdateAccountUserDto, @Request() req) {
    const user: User = req.user;
    return this.accountsService.updateAccountUser(uuid, data, user);
  }

  @Patch('users/is-active/:uuid')
  updateAccountUserIsActive(@Param('uuid') uuid: string) {
    return this.accountsService.updateAccountUserIsActive(uuid);
  }

  @Get('users/totals')
  async totalsAccountUsers(@AccountId() account_id: number) {
    const {
      total,
      pending_job_position_settings,
      pending_evaluation_settings,
      not_evaluated_yet
    } = await this.accountsService.totalsAccountUsers(account_id);
    return new TotalsAccountUsersResponseDto(total, pending_job_position_settings, pending_evaluation_settings, not_evaluated_yet);
  }
}
