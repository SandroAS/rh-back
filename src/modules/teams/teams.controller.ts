import { Controller, Post, Body, UseGuards, Get, Query, Param, Put, HttpCode, HttpStatus, Delete } from '@nestjs/common';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { TeamsService } from './teams.service';
import { AccountId } from '@/common/decorators/account-id.decorator';
import { AuthUser } from '@/common/decorators/auth-user.decorator';
import { User } from '@/entities/user.entity';
import { CreateTeamDto } from './dtos/create-team.dto';
import { UpdateTeamDto } from './dtos/update-team.dto';
import { TeamResponseDto } from './dtos/team-response.dto';
import { PaginationDto } from '@/common/dtos/pagination.dto';
import { TeamPaginationResponseDto } from './dtos/team-pagination-response.dto';
import { TotalsTeamsResponseDto } from './dtos/totals-teams-response.dto';

@Controller('teams')
@UseGuards(JwtAuthGuard)
export class TeamsController {
  constructor(private readonly service: TeamsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() dto: CreateTeamDto,
    @AuthUser() user: User
  ): Promise<TeamResponseDto> {
    const team = await this.service.createWithAccountId(dto, user);
    return new TeamResponseDto(team);
  }

  @Get('totals')
  async getTotals(@AccountId() account_id: number): Promise<TotalsTeamsResponseDto> {
    const totals = await this.service.totalsTeams(account_id);
    return new TotalsTeamsResponseDto(
      totals.total,
      totals.pending_sector_settings,
      totals.exceeded_team_members
    );
  }

  @Get('pagination')
  async findAndPaginate(@Query() pagination: PaginationDto, @AccountId() account_id: number): Promise<TeamPaginationResponseDto> {
    const result = await this.service.findAndPaginateWithAccountId(pagination, account_id);
    return new TeamPaginationResponseDto(result);
  }

  @Get('user-logged-members')
  async getUserLoggedTeam(@AuthUser() user: User): Promise<TeamResponseDto | Record<string, never>> {
    const team = await this.service.findTeamByUserLogged(user.id, user.account_id);
    if (!team) {
      return {};
    }
    return new TeamResponseDto(team);
  }

  @Get(':uuid')
  async findOne(@Param('uuid') uuid: string, @AccountId() account_id: number): Promise<TeamResponseDto> {
    const team = await this.service.findOneWithAccountId(uuid, account_id);
    return new TeamResponseDto(team);
  }

  @Put(':uuid')
  async update(
    @Param('uuid') uuid: string,
    @Body() dto: UpdateTeamDto,
    @AccountId() account_id: number
  ): Promise<TeamResponseDto> {
    const updatedTeam = await this.service.updateWithAccountId(uuid, dto, account_id);
    return new TeamResponseDto(updatedTeam);
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('uuid') uuid: string, @AccountId() account_id: number): Promise<void> {
    await this.service.removeWithAccountId(uuid, account_id);
  }
}
