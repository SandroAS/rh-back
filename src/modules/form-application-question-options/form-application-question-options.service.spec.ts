import { Test, TestingModule } from '@nestjs/testing';
import { FormApplicationQuestionOptionsService } from './form-application-question-options.service';

describe('FormApplicationQuestionOptionsService', () => {
  let service: FormApplicationQuestionOptionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormApplicationQuestionOptionsService],
    }).compile();

    service = module.get<FormApplicationQuestionOptionsService>(FormApplicationQuestionOptionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
