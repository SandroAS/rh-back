import { Test, TestingModule } from '@nestjs/testing';
import { FormApplicationTopicsService } from './form-application-topics.service';

describe('FormApplicationTopicsService', () => {
  let service: FormApplicationTopicsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormApplicationTopicsService],
    }).compile();

    service = module.get<FormApplicationTopicsService>(FormApplicationTopicsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
