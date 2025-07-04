import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddRelationshipsAccountsToUsers1748797776711 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
