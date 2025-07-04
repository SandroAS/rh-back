import { MigrationInterface, QueryRunner } from "typeorm";
export declare class CreateSubscriptionCharges1749300037340 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
