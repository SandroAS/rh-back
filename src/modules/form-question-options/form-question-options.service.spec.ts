import { Test, TestingModule } from '@nestjs/testing';
import { FormQuestionOptionsService } from './form-question-options.service';

describe('FormQuestionOptionsService', () => {
  let service: FormQuestionOptionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormQuestionOptionsService],
    }).compile();

    service = module.get<FormQuestionOptionsService>(FormQuestionOptionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
