import { TrialsService } from './trials.service';
import { Trial } from '@/entities/trial.entity';
import { CreateTrialDto } from './dtos/create-trial.dto';
export declare class TrialsController {
    private readonly trialsService;
    constructor(trialsService: TrialsService);
    findAll(): Promise<Trial[]>;
    findOne(id: number): Promise<Trial>;
    create(data: CreateTrialDto): Promise<Trial>;
    update(id: number, data: Partial<Trial>): Promise<Trial>;
    remove(id: number): Promise<void>;
}
