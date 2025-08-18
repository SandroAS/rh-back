import { Test, TestingModule } from '@nestjs/testing';
import { JobPositionsLevelsGroupsController } from './job-positions-levels-groups.controller';

describe('JobPositionsLevelsGroupsController', () => {
  let controller: JobPositionsLevelsGroupsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobPositionsLevelsGroupsController],
    }).compile();

    controller = module.get<JobPositionsLevelsGroupsController>(JobPositionsLevelsGroupsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
