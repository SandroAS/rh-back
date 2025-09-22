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

  constructor(paginationResult: PaginationResult<Team>) {
    this.total = paginationResult.total;
    this.page = paginationResult.page;
    this.last_page = paginationResult.last_page;
    this.limit = paginationResult.limit;
    this.data = [];

    if (paginationResult.data && paginationResult.data.length > 0) {
      this.data = paginationResult.data.map(
        (team: Team) => new TeamResponseDto(team)
      );
    }
  }
}
