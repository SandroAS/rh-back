import { Form } from '@/entities/form.entity';
import { DRDResponseDto } from '@/modules/drds/dtos/drd-response.dto';
import { FormTopicResponseDto } from '@/modules/form-topics/dtos/form-topic-response.dto';
import { UserAvatarResponseDto } from '@/modules/users/dtos/user-avatar-response.dto';
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
    Object.assign(this, form);

    this.topics = form.topics ? form.topics.map(topic => new FormTopicResponseDto(topic)) : [];
  }
}