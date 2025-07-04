import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Account } from './account.entity';
import { BaseEntity } from '@/common/entities/base.entity';

export enum OdontogramCategoryType {
  TOOTH = 'TOOTH',
  FACE = 'FACE'
}

@Entity('odontogram_categories')
export class OdontogramCategory extends BaseEntity {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 7 })
  color: string;

  @Column({ type: 'enum', enum: OdontogramCategoryType })
  type: OdontogramCategoryType;

  @Column()
  account_id: number;

  @ManyToOne(() => Account, account => account.odontogramCategories, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'account_id', referencedColumnName: 'id' })
  account: Account;
}
