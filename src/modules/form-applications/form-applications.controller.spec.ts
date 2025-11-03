import { Test, TestingModule } from '@nestjs/testing';
import { FormApplicationsController } from './form-applications.controller';

describe('FormApplicationsController', () => {
  let controller: FormApplicationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormApplicationsController],
    }).compile();

    controller = module.get<FormApplicationsController>(FormApplicationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
