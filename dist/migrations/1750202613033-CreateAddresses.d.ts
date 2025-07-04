import { MigrationInterface, QueryRunner } from "typeorm";
export declare class CreateAddresses1750202613033 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
