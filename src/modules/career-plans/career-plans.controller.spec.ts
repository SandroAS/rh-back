import { Test, TestingModule } from '@nestjs/testing';
import { CareerPlansController } from './career-plans.controller';

describe('CareerPlansController', () => {
  let controller: CareerPlansController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CareerPlansController],
    }).compile();

    controller = module.get<CareerPlansController>(CareerPlansController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
