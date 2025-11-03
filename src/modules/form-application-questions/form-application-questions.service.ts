import { FormApplicationQuestion } from '@/entities/form-application-question.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FormApplicationsService } from '../form-applications/form-applications.service';


@Injectable()
export class FormApplicationQuestionsService {
  constructor(
    @InjectRepository(FormApplicationQuestion)
    private readonly repository: Repository<FormApplicationQuestion>,
    private readonly formApplicationService: FormApplicationsService,
  ) {}

  // Lógica de CRUD (principalmente consulta e leitura)
}
