import { DRDLevel } from '@/entities/drd-level.entity';
import { Expose } from 'class-transformer';

export default class DrdLevelResponseDto {
  @Expose() id: number;
  @Expose() uuid: string;
  @Expose() name: string;
  @Expose() order: number;
  
  constructor(level: DRDLevel) {
    this.id = level.id;
    this.uuid = level.uuid;
    this.name = level.name;
    this.order = level.order;
  }
}
