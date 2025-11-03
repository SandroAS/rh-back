import { Test, TestingModule } from '@nestjs/testing';
import { FormApplicationQuestionOptionsController } from './form-application-question-options.controller';

describe('FormApplicationQuestionOptionsController', () => {
  let controller: FormApplicationQuestionOptionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormApplicationQuestionOptionsController],
    }).compile();

    controller = module.get<FormApplicationQuestionOptionsController>(FormApplicationQuestionOptionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
