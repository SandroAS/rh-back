import { Expose } from 'class-transformer';

export class TotalsTeamsResponseDto {
  @Expose()
  total: number;

  @Expose()
  pending_sector_settings: number;

  @Expose()
  exceeded_team_members: number;

  constructor(total: number, pending_sector_settings: number, exceeded_team_members: number) {
    this.total = total;
    this.pending_sector_settings = pending_sector_settings;
    this.exceeded_team_members = exceeded_team_members;
  }
}
