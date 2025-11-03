import { Test, TestingModule } from '@nestjs/testing';
import { FormQuestionsController } from './form-questions.controller';

describe('FormQuestionsController', () => {
  let controller: FormQuestionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormQuestionsController],
    }).compile();

    controller = module.get<FormQuestionsController>(FormQuestionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
