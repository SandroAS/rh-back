import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddRelationshipsToSubscriptionCharges1749300489423 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
