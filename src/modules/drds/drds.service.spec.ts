import { Test, TestingModule } from '@nestjs/testing';
import { DrdsService } from './drds.service';

describe('DrdsService', () => {
  let service: DrdsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DrdsService],
    }).compile();

    service = module.get<DrdsService>(DrdsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
