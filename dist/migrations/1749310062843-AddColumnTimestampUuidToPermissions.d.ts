import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddColumnTimestampUuidToPermissions1749310062843 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
