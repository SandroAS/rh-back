import { Test, TestingModule } from '@nestjs/testing';
import { AccountSeedsController } from './account-seeds.controller';

describe('AccountSeedsController', () => {
  let controller: AccountSeedsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountSeedsController],
    }).compile();

    controller = module.get<AccountSeedsController>(AccountSeedsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
