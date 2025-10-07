import { Test, TestingModule } from '@nestjs/testing';
import { DrdTopicItemsController } from './drd-topic-items.controller';

describe('DrdTopicItemsController', () => {
  let controller: DrdTopicItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DrdTopicItemsController],
    }).compile();

    controller = module.get<DrdTopicItemsController>(DrdTopicItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
