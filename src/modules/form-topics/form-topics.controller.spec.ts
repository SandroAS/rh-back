import { Test, TestingModule } from '@nestjs/testing';
import { FormTopicsController } from './form-topics.controller';

describe('FormTopicsController', () => {
  let controller: FormTopicsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormTopicsController],
    }).compile();

    controller = module.get<FormTopicsController>(FormTopicsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
