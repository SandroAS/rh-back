import { Test, TestingModule } from '@nestjs/testing';
import { FormAnswerMultiOptionsService } from './form-answer-multi-options.service';

describe('FormAnswerMultiOptionsService', () => {
  let service: FormAnswerMultiOptionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormAnswerMultiOptionsService],
    }).compile();

    service = module.get<FormAnswerMultiOptionsService>(FormAnswerMultiOptionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
