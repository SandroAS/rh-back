import { Test, TestingModule } from '@nestjs/testing';
import { DrdTopicsService } from './drd-topics.service';

describe('DrdTopicsService', () => {
  let service: DrdTopicsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DrdTopicsService],
    }).compile();

    service = module.get<DrdTopicsService>(DrdTopicsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
