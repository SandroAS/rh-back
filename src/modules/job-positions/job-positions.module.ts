import { Module } from '@nestjs/common';
import { JobPositionService } from './job-positions.service';
import { JobPositionController } from './job-positions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobPosition } from '@/entities/job-position.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JobPosition])],
  controllers: [JobPositionController],
  providers: [JobPositionService],
  exports: [JobPositionService],
})
export class JobPositionsModule {}
