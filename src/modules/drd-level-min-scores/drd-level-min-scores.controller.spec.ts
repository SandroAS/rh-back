import { Test, TestingModule } from '@nestjs/testing';
import { DrdLevelMinScoresController } from './drd-level-min-scores.controller';

describe('DrdLevelMinScoresController', () => {
  let controller: DrdLevelMinScoresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DrdLevelMinScoresController],
    }).compile();

    controller = module.get<DrdLevelMinScoresController>(DrdLevelMinScoresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
