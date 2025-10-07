import { Test, TestingModule } from '@nestjs/testing';
import { DrdTopicItemsService } from './drd-topic-items.service';

describe('DrdTopicItemsService', () => {
  let service: DrdTopicItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DrdTopicItemsService],
    }).compile();

    service = module.get<DrdTopicItemsService>(DrdTopicItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
