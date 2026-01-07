import { Test, TestingModule } from '@nestjs/testing';
import { AccountSeedsService } from './account-seeds.service';

describe('AccountSeedsService', () => {
  let service: AccountSeedsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountSeedsService],
    }).compile();

    service = module.get<AccountSeedsService>(AccountSeedsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
