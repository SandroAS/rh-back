import { Test, TestingModule } from '@nestjs/testing';
import { FormTopicsService } from './form-topics.service';

describe('FormTopicsService', () => {
  let service: FormTopicsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormTopicsService],
    }).compile();

    service = module.get<FormTopicsService>(FormTopicsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
