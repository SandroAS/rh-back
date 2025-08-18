import { Test, TestingModule } from '@nestjs/testing';
import { JobPositionsLevelsController } from './job-positions-levels.controller';

describe('JobPositionsLevelsController', () => {
  let controller: JobPositionsLevelsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobPositionsLevelsController],
    }).compile();

    controller = module.get<JobPositionsLevelsController>(JobPositionsLevelsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
