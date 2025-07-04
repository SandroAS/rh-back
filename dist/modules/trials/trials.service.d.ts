import { EntityManager, Repository } from 'typeorm';
import { Trial } from '@/entities/trial.entity';
import { CreateTrialDto } from './dtos/create-trial.dto';
export declare class TrialsService {
    private readonly trialRepository;
    constructor(trialRepository: Repository<Trial>);
    findAll(): Promise<Trial[]>;
    findOne(id: number): Promise<Trial>;
    create(data: CreateTrialDto, manager?: EntityManager): Promise<Trial>;
    update(id: number, data: Partial<Trial>): Promise<Trial>;
    remove(id: number): Promise<void>;
}
