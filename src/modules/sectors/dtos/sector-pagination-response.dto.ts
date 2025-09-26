import { Expose, Type } from 'class-transformer';
import { Sector } from '@/entities/sector.entity';
import { SectorResponseDto } from './sector-response.dto';
import { PaginationResult } from '@/common/services/base.service';

export class SectorPaginationResponseDto {
  @Expose()
  total: number;

  @Expose()
  page: number;

  @Expose()
  last_page: number;

  @Expose()
  limit: number;

  @Expose()
  @Type(() => SectorResponseDto)
  data: SectorResponseDto[];

  constructor(paginationResult: PaginationResult<Sector>) {
    this.total = paginationResult.total;
    this.page = paginationResult.page;
    this.last_page = paginationResult.last_page;
    this.limit = paginationResult.limit;
    this.data = [];

    if (paginationResult.data && paginationResult.data.length > 0) {
      this.data = paginationResult.data.map(
        (sector: Sector) => new SectorResponseDto(sector)
      );
    }
  }
}
