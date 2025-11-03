import { Test, TestingModule } from '@nestjs/testing';
import { FormAnswerMultiOptionsController } from './form-answer-multi-options.controller';

describe('FormAnswerMultiOptionsController', () => {
  let controller: FormAnswerMultiOptionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormAnswerMultiOptionsController],
    }).compile();

    controller = module.get<FormAnswerMultiOptionsController>(FormAnswerMultiOptionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
