import { FormQuestionOption } from '@/entities/form-question-option.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FormQuestionsService } from '../form-questions/form-questions.service';

@Injectable()
export class FormQuestionOptionsService {
  constructor(
    @InjectRepository(FormQuestionOption)
    private readonly optionRepository: Repository<FormQuestionOption>,
    private readonly questionService: FormQuestionsService
  ) {}
}
