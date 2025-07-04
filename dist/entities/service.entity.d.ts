import { BaseEntity } from '../common/entities/base.entity';
import { Account } from './account.entity';
import { SystemModule } from './system-module.entity';
export declare class Service extends BaseEntity {
    name: string;
    description: string;
    price: number;
    account_id: number;
    account: Account;
    system_module_id: number;
    systemModule: SystemModule;
}
