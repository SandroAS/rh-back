import { EvaluationType } from '@/entities/evaluation-application.entity';
import { IsUUID, IsEnum, IsOptional, IsNotEmpty, IsString } from 'class-validator';

export class EvaluationApplicationItemDto {
    @IsNotEmpty()
    @IsString()
    evaluation_uuid: string;

    @IsNotEmpty({ message: 'O tipo de avaliação é obrigatório.' })
    @IsEnum(EvaluationType, { message: 'Tipo de avaliação inválido.' })
    type: EvaluationType;

    @IsNotEmpty({ message: 'O UUID do usuário avaliado é obrigatório.' })
    @IsUUID('4', { message: 'UUID inválido para o usuário avaliado.' })
    evaluated_user_uuid: string;

    @IsNotEmpty({ message: 'O UUID do usuário avaliador é obrigatório.' })
    @IsUUID('4', { message: 'UUID inválido para o usuário avaliador.' })
    submitting_user_uuid: string;
}
