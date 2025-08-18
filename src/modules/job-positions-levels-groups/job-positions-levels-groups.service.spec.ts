import { Test, TestingModule } from '@nestjs/testing';
import { JobPositionsLevelsGroupsService } from './job-positions-levels-groups.service';

describe('JobPositionsLevelsGroupsService', () => {
  let service: JobPositionsLevelsGroupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobPositionsLevelsGroupsService],
    }).compile();

    service = module.get<JobPositionsLevelsGroupsService>(JobPositionsLevelsGroupsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
