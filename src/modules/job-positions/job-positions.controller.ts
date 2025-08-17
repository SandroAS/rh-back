import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { JobPositionService } from './job-positions.service';
import { CreateJobPositionDto } from './dtos/create-job-position.dto';
import { UpdateJobPositionDto } from './dtos/update-job-position.dto';
import { JobPosition } from '@/entities/job-position.entity';

@Controller('job-positions')
export class JobPositionController {
  constructor(private readonly jobPositionService: JobPositionService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createJobPositionDto: CreateJobPositionDto): Promise<JobPosition> {
    return this.jobPositionService.create(createJobPositionDto);
  }

  @Get()
  findAll(): Promise<JobPosition[]> {
    return this.jobPositionService.findAll();
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string): Promise<JobPosition> {
    return this.jobPositionService.findOne(uuid);
  }

  @Patch(':uuid')
  update(
    @Param('uuid') uuid: string,
    @Body() updateJobPositionDto: UpdateJobPositionDto,
  ): Promise<JobPosition> {
    return this.jobPositionService.update(uuid, updateJobPositionDto);
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('uuid') uuid: string): Promise<void> {
    return this.jobPositionService.remove(uuid);
  }
}
