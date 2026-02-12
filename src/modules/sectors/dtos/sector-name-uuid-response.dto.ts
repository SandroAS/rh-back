import { Expose } from 'class-transformer';
import { Sector } from '@/entities/sector.entity';

export class SectorNameUuidResponseDto {
  @Expose()
  uuid: string;

  @Expose()
  name: string;

  constructor(partial: Partial<Sector>) {
    this.uuid = partial.uuid;
    this.name = partial.name;
  }
}
