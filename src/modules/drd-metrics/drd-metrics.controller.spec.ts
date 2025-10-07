import { Test, TestingModule } from '@nestjs/testing';
import { DrdMetricsController } from './drd-metrics.controller';

describe('DrdMetricsController', () => {
  let controller: DrdMetricsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DrdMetricsController],
    }).compile();

    controller = module.get<DrdMetricsController>(DrdMetricsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
