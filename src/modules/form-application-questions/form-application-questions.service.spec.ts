import { Test, TestingModule } from '@nestjs/testing';
import { FormApplicationQuestionsService } from './form-application-questions.service';

describe('FormApplicationQuestionsService', () => {
  let service: FormApplicationQuestionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormApplicationQuestionsService],
    }).compile();

    service = module.get<FormApplicationQuestionsService>(FormApplicationQuestionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
