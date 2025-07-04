import { MigrationInterface, QueryRunner } from "typeorm";
export declare class CreateSystemModules1749759193616 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
