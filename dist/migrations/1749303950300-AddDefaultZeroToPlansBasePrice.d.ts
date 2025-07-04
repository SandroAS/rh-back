import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddDefaultZeroToPlansBasePrice1749303950300 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
