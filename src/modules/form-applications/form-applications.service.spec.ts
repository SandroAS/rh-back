import { Test, TestingModule } from '@nestjs/testing';
import { FormApplicationsService } from './form-applications.service';

describe('FormApplicationsService', () => {
  let service: FormApplicationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormApplicationsService],
    }).compile();

    service = module.get<FormApplicationsService>(FormApplicationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
