import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddColumnIsActiveToUsers1749307102818 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
