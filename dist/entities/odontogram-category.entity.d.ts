import { Account } from './account.entity';
import { BaseEntity } from '@/common/entities/base.entity';
export declare enum OdontogramCategoryType {
    TOOTH = "TOOTH",
    FACE = "FACE"
}
export declare class OdontogramCategory extends BaseEntity {
    name: string;
    color: string;
    type: OdontogramCategoryType;
    account_id: number;
    account: Account;
}
