import { MigrationInterface, QueryRunner } from "typeorm";
export declare class CreateAccounts1748796641425 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
