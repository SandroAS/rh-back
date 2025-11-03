import { IsNotEmpty, IsInt } from 'class-validator';

export class CreateFormAnswerMultiOptionDto {
    @IsNotEmpty()
    @IsInt()
    readonly application_option_id: number;
}