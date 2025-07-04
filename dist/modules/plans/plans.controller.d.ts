import { PlansService } from './plans.service';
import { Plan } from '@/entities/plan.entity';
export declare class PlansController {
    private readonly plansService;
    constructor(plansService: PlansService);
    findAll(): Promise<Plan[]>;
    findOne(id: number): Promise<Plan>;
    create(data: Partial<Plan>): Promise<Plan>;
    update(id: number, data: Partial<Plan>): Promise<Plan>;
    remove(id: number): Promise<void>;
}
