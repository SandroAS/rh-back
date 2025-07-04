import { Repository } from 'typeorm';
import { AttemptCharge } from '@/entities/attempt-charge.entity';
export declare class AttemptChargesService {
    private readonly attemptChargeRepo;
    constructor(attemptChargeRepo: Repository<AttemptCharge>);
    findAll(): Promise<AttemptCharge[]>;
    findById(id: number): Promise<AttemptCharge | null>;
    create(data: Partial<AttemptCharge>): Promise<AttemptCharge>;
    update(id: number, data: Partial<AttemptCharge>): Promise<AttemptCharge>;
    delete(id: number): Promise<void>;
}
