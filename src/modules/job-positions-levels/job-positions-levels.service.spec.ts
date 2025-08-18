import { Test, TestingModule } from '@nestjs/testing';
import { JobPositionsLevelsService } from './job-positions-levels.service';

describe('JobPositionsLevelsService', () => {
  let service: JobPositionsLevelsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobPositionsLevelsService],
    }).compile();

    service = module.get<JobPositionsLevelsService>(JobPositionsLevelsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
