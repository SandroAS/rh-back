import { Test, TestingModule } from '@nestjs/testing';
import { OdontogramCategoriesController } from './odontogram-categories.controller';

describe('OdontogramCategoriesController', () => {
  let controller: OdontogramCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OdontogramCategoriesController],
    }).compile();

    controller = module.get<OdontogramCategoriesController>(OdontogramCategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
