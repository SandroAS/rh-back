import { FormQuestion } from '@/entities/form-question.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FormsService } from '../forms/forms.service';

@Injectable()
export class FormQuestionsService {
  constructor(
    @InjectRepository(FormQuestion)
    private readonly questionRepository: Repository<FormQuestion>,
    private readonly formService: FormsService,
  ) {}

}