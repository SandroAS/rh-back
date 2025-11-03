import { Test, TestingModule } from '@nestjs/testing';
import { FormQuestionOptionsController } from './form-question-options.controller';

describe('FormQuestionOptionsController', () => {
  let controller: FormQuestionOptionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormQuestionOptionsController],
    }).compile();

    controller = module.get<FormQuestionOptionsController>(FormQuestionOptionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
