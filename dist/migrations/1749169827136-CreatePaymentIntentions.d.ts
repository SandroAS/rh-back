import { MigrationInterface, QueryRunner } from "typeorm";
export declare class CreatePaymentIntentions1749169827136 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
