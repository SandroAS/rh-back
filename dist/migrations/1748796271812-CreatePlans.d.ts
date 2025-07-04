import { MigrationInterface, QueryRunner } from "typeorm";
export declare class CreatePlans1748796271812 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
