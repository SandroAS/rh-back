import { Account } from '@/entities/account.entity';
import { TrialResponseDto } from '@/modules/trials/dtos/trial-response.dto';
import { SystemModuleResponseDto } from '@/modules/system-modules/dtos/system-modules-response.dto';
export declare class AccountResponseDto {
    uuid: string;
    in_trial: boolean;
    lastTrial: TrialResponseDto;
    systemModules: SystemModuleResponseDto[];
    constructor(partial: Partial<Account>);
}
