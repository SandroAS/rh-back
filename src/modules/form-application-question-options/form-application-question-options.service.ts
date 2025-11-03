import { FormApplicationQuestionOption } from '@/entities/form-application-question-option.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FormApplicationQuestionOptionsService {
  constructor(
    @InjectRepository(FormApplicationQuestionOption)
    private readonly repository: Repository<FormApplicationQuestionOption>,
  ) {}

}
