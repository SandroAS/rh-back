import { Test, TestingModule } from '@nestjs/testing';
import { CareerPlansService } from './career-plans.service';

describe('CareerPlansService', () => {
  let service: CareerPlansService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CareerPlansService],
    }).compile();

    service = module.get<CareerPlansService>(CareerPlansService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
