import { Test, TestingModule } from '@nestjs/testing';
import { DrdTopicsController } from './drd-topics.controller';

describe('DrdTopicsController', () => {
  let controller: DrdTopicsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DrdTopicsController],
    }).compile();

    controller = module.get<DrdTopicsController>(DrdTopicsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
