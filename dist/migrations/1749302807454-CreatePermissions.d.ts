import { MigrationInterface, QueryRunner } from "typeorm";
export declare class CreatePermissions1749302807454 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
