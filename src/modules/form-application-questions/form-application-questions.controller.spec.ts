import { Test, TestingModule } from '@nestjs/testing';
import { FormApplicationQuestionsController } from './form-application-questions.controller';

describe('FormApplicationQuestionsController', () => {
  let controller: FormApplicationQuestionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormApplicationQuestionsController],
    }).compile();

    controller = module.get<FormApplicationQuestionsController>(FormApplicationQuestionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
