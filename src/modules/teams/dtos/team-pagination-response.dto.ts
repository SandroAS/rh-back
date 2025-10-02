// src/teams/dtos/team-pagination-response.dto.ts

import { Expose, Type } from 'class-transformer';
import { TeamResponseDto } from './team-response.dto';
import { Team } from '@/entities/team.entity';
import { PaginationResult } from '@/common/services/base.service';

export class TeamPaginationResponseDto {
  @Expose()
  total: number;

  @Expose()
  page: number;

  @Expose()
  last_page: number;

  @Expose()
  limit: number;

  @Expose()
  @Type(() => TeamResponseDto)
  data: TeamResponseDto[];

  constructor(teamPagination: { data: TeamResponseDto[], total: number, page: number, last_page: number, limit: number }) {
    this.total = teamPagination.total;
    this.page = teamPagination.page;
    this.last_page = teamPagination.last_page;
    this.limit = teamPagination.limit;
    this.data = [];

    if (teamPagination.data && teamPagination.data.length > 0) {
      this.data = teamPagination.data.map(
        (team: Team) => new TeamResponseDto(team)
      );
    }
  }
}
