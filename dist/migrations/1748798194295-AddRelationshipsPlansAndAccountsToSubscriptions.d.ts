import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddRelationshipsAccountsToSubscriptions1748798194295 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
