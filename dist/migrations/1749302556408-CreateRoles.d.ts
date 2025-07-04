import { MigrationInterface, QueryRunner } from "typeorm";
export declare class CreateRoles1749302556408 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
