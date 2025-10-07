import { Test, TestingModule } from '@nestjs/testing';
import { DrdLevelsService } from './drd-levels.service';

describe('DrdLevelsService', () => {
  let service: DrdLevelsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DrdLevelsService],
    }).compile();

    service = module.get<DrdLevelsService>(DrdLevelsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
