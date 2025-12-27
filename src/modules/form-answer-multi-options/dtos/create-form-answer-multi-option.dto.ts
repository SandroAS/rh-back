import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFormAnswerMultiOptionDto {
    @IsNotEmpty()
    @IsString()
    readonly application_option_uuid: string;
}
