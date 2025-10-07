import { Test, TestingModule } from '@nestjs/testing';
import { DrdMetricsService } from './drd-metrics.service';

describe('DrdMetricsService', () => {
  let service: DrdMetricsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DrdMetricsService],
    }).compile();

    service = module.get<DrdMetricsService>(DrdMetricsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
