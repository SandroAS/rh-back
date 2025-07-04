import { MigrationInterface, QueryRunner } from "typeorm";
export declare class CreateCompany1750026932984 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
