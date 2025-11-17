import { Evaluation } from '@/entities/evaluation.entity';
import { DRDResponseDto } from '@/modules/drds/dtos/drd-response.dto';
import { FormResponseDto } from '@/modules/forms/dtos/form-response.dto';
import { UserAvatarResponseDto } from '@/modules/users/dtos/user-avatar-response.dto';
import { Expose, Type } from 'class-transformer';

export class EvaluationResponseDto {
  
  @Expose()
  readonly uuid: string;

  @Expose()
  readonly name: string;

  @Expose()
  readonly description: string;

  @Expose()
  readonly rate: number;

  @Expose()
  @Type(() => UserAvatarResponseDto)
  readonly createdBy: UserAvatarResponseDto; 
  
  @Expose()
  @Type(() => DRDResponseDto)
  readonly drd: DRDResponseDto;

  @Expose()
  @Type(() => FormResponseDto)
  readonly form: FormResponseDto;

  constructor(evaluation: Evaluation) {
    Object.assign(this, evaluation);
    this.drd = null;

    if (evaluation.drd) {
      this.drd = new DRDResponseDto(evaluation.drd);
    }

    if (evaluation.createdBy) {
      this.createdBy = new UserAvatarResponseDto(evaluation.createdBy);
    }

    if (evaluation.form) {
      this.form = new FormResponseDto(evaluation.form);
    }
  }
}