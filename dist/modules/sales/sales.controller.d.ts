import { SalesService } from './sales.service';
import { CreateSaleDto } from './dtos/create-sale.dto';
import { UpdateSaleDto } from './dtos/update-sale.dto';
export declare class SalesController {
    private readonly salesService;
    constructor(salesService: SalesService);
    create(dto: CreateSaleDto): Promise<import("../../entities/sale.entity").Sale>;
    findAll(): Promise<import("../../entities/sale.entity").Sale[]>;
    findOne(id: number): Promise<import("../../entities/sale.entity").Sale>;
    update(id: number, dto: UpdateSaleDto): Promise<import("../../entities/sale.entity").Sale>;
    remove(id: number): Promise<void>;
}
