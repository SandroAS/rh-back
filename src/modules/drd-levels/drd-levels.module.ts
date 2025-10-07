import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DrdLevelsService } from './drd-levels.service';
import { DrdLevelsController } from './drd-levels.controller';
import { DRDLevel } from '@/entities/drd-level.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DRDLevel])],
  controllers: [DrdLevelsController],
  providers: [DrdLevelsService],
  exports: [DrdLevelsService], 
})
export class DrdLevelsModule {}
