import { FormTopic } from '@/entities/form-topic.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FormTopicsService {
  constructor(
    @InjectRepository(FormTopic)
    private readonly formTopicRepository: Repository<FormTopic>,
  ) {}

  // Este serviço será usado principalmente pelo FormService para salvar tópicos aninhados.
  // Exemplo:
  /*
  async createTopic(data: CreateFormTopicDto, formId: number): Promise<FormTopic> {
    const topic = this.formTopicRepository.create({ ...data, form_id: formId });
    return this.formTopicRepository.save(topic);
  }
  */
}