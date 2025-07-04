import { Repository } from 'typeorm';
import { Plan } from '@/entities/plan.entity';
export declare class PlansService {
    private readonly planRepository;
    constructor(planRepository: Repository<Plan>);
    findAll(): Promise<Plan[]>;
    findOne(id: number): Promise<Plan>;
    create(data: Partial<Plan>): Promise<Plan>;
    update(id: number, data: Partial<Plan>): Promise<Plan>;
    remove(id: number): Promise<void>;
}
