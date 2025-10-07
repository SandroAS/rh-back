import { Test, TestingModule } from '@nestjs/testing';
import { DrdLevelsController } from './drd-levels.controller';

describe('DrdLevelsController', () => {
  let controller: DrdLevelsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DrdLevelsController],
    }).compile();

    controller = module.get<DrdLevelsController>(DrdLevelsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
