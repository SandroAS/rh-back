import { AttemptChargesService } from './attempt-charges.service';
import { AttemptCharge } from '@/entities/attempt-charge.entity';
export declare class AttemptChargesController {
    private readonly service;
    constructor(service: AttemptChargesService);
    findAll(): Promise<AttemptCharge[]>;
    findOne(id: number): Promise<AttemptCharge>;
    create(data: Partial<AttemptCharge>): Promise<AttemptCharge>;
    update(id: number, data: Partial<AttemptCharge>): Promise<AttemptCharge>;
    delete(id: number): Promise<void>;
}
