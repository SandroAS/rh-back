import { Test, TestingModule } from '@nestjs/testing';
import { FormApplicationTopicsController } from './form-application-topics.controller';

describe('FormApplicationTopicsController', () => {
  let controller: FormApplicationTopicsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormApplicationTopicsController],
    }).compile();

    controller = module.get<FormApplicationTopicsController>(FormApplicationTopicsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
