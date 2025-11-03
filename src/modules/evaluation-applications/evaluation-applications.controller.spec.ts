import { Test, TestingModule } from '@nestjs/testing';
import { EvaluationApplicationsController } from './evaluation-applications.controller';

describe('EvaluationApplicationsController', () => {
  let controller: EvaluationApplicationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EvaluationApplicationsController],
    }).compile();

    controller = module.get<EvaluationApplicationsController>(EvaluationApplicationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

// PAREI NOS DTOS DESSA ENTIDADE