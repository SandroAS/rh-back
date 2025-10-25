import { Expose, Type } from 'class-transformer';
import { DRD } from '@/entities/drd.entity';
import { DRDResponseDto } from './drd-response.dto';

export class DRDPaginationResponseDto {
  @Expose()
  total: number;

  @Expose()
  page: number;

  @Expose()
  last_page: number;

  @Expose()
  limit: number;

  @Expose()
  @Type(() => DRDResponseDto)
  data: DRDResponseDto[];

  constructor(drdPagination: { data: DRD[], total: number, page: number, last_page: number, limit: number }) {
    this.total = drdPagination.total;
    this.page = drdPagination.page;
    this.last_page = drdPagination.last_page;
    this.limit = drdPagination.limit;
    this.data = [];

    if (drdPagination.data && drdPagination.data.length > 0) {
      this.data = drdPagination.data.map(
        (drd: DRD) => new DRDResponseDto(drd)
      );
    }
  }
}
