import { Test, TestingModule } from '@nestjs/testing';
import { EvaluationApplicationsService } from './evaluation-applications.service';

describe('EvaluationApplicationsService', () => {
  let service: EvaluationApplicationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EvaluationApplicationsService],
    }).compile();

    service = module.get<EvaluationApplicationsService>(EvaluationApplicationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
