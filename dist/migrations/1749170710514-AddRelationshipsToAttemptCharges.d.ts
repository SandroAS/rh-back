import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddRelationshipsToAttemptCharges1749170710514 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
