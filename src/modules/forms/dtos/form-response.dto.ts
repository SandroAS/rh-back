import { Form } from '@/entities/form.entity';
import { FormTopicResponseDto } from '@/modules/form-topics/dtos/form-topic-response.dto';
import { Expose, Type } from 'class-transformer';

export class FormResponseDto {
  
  @Expose()
  readonly uuid: string;

  @Expose()
  readonly name: string;

  @Expose()
  readonly description: string;

  @Expose()
  @Type(() => FormTopicResponseDto)
  readonly topics: FormTopicResponseDto[];

  constructor(form: Form) {
    this.uuid = form.uuid;
    this.name = form.name;
    this.description = form.description;

    this.topics = form.topics ? form.topics.map(topic => new FormTopicResponseDto(topic)) : [];
  }
}