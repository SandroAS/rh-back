import { EvaluationType } from '@/entities/evaluation-application.entity';

export class EvaluationApplicationResponseDto {
    readonly uuid: string;
    readonly evaluation_id: number;
    readonly type: EvaluationType;
    readonly started_date: Date;
    readonly expiration_date: Date;
    readonly evaluated_user_id: number;
    readonly submitting_user_id: number;
}
