import { Test, TestingModule } from '@nestjs/testing';
import { DrdsController } from './drds.controller';

describe('DrdsController', () => {
  let controller: DrdsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DrdsController],
    }).compile();

    controller = module.get<DrdsController>(DrdsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
