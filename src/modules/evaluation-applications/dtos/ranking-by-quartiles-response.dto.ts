import { Expose, Type } from 'class-transformer';
import { UserAvatarResponseDto } from '@/modules/users/dtos/user-avatar-response.dto';

export type QuartileLabel = 'top_25' | 'second_25' | 'third_25' | 'bottom_25';

/**
 * Usuário no ranking com sua porcentagem média (0-100).
 */
export class RankingUserDto {
  @Expose()
  @Type(() => UserAvatarResponseDto)
  user: UserAvatarResponseDto;

  @Expose()
  average_rate_percentage: number;

  constructor(user: UserAvatarResponseDto, average_rate_percentage: number) {
    this.user = user;
    this.average_rate_percentage = average_rate_percentage;
  }
}

/**
 * Um dos quatro grupos (quartis) do ranking.
 */
export class RankingQuartileGroupDto {
  @Expose()
  quartile: QuartileLabel;

  @Expose()
  @Type(() => RankingUserDto)
  users: RankingUserDto[];

  constructor(quartile: QuartileLabel, users: RankingUserDto[]) {
    this.quartile = quartile;
    this.users = users;
  }
}

export class RankingByQuartilesResponseDto {
  @Expose()
  @Type(() => RankingQuartileGroupDto)
  data: RankingQuartileGroupDto[];

  constructor(data: RankingQuartileGroupDto[]) {
    this.data = data;
  }
}
