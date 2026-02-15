import { TrialsService } from './trials.service';
import { TrialResponseDto } from './dtos/trial-response.dto';
export declare class TrialsController {
    private readonly trialsService;
    constructor(trialsService: TrialsService);
    findMyTrial(account_id: number): Promise<TrialResponseDto>;
}
