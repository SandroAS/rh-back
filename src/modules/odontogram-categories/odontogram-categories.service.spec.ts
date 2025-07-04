import { Test, TestingModule } from '@nestjs/testing';
import { OdontogramCategoriesService } from './odontogram-categories.service';

describe('OdontogramCategoriesService', () => {
  let service: OdontogramCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OdontogramCategoriesService],
    }).compile();

    service = module.get<OdontogramCategoriesService>(OdontogramCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
