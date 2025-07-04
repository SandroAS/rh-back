import { MigrationInterface, QueryRunner } from "typeorm";
export declare class CreateUserMetas1749753080016 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
