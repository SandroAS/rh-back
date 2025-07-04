import { MigrationInterface, QueryRunner } from "typeorm";
export declare class CreateUsers1748797027265 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
