import { Test, TestingModule } from '@nestjs/testing';
import { DrdLevelMinScoresService } from './drd-level-min-scores.service';

describe('DrdLevelMinScoresService', () => {
  let service: DrdLevelMinScoresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DrdLevelMinScoresService],
    }).compile();

    service = module.get<DrdLevelMinScoresService>(DrdLevelMinScoresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
