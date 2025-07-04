import { Repository } from 'typeorm';
import { Sale } from '@/entities/sale.entity';
import { CreateSaleDto } from './dtos/create-sale.dto';
import { UpdateSaleDto } from './dtos/update-sale.dto';
export declare class SalesService {
    private readonly saleRepository;
    constructor(saleRepository: Repository<Sale>);
    create(dto: CreateSaleDto): Promise<Sale>;
    findAll(): Promise<Sale[]>;
    findOne(id: number): Promise<Sale>;
    update(id: number, dto: UpdateSaleDto): Promise<Sale>;
    remove(id: number): Promise<void>;
}
