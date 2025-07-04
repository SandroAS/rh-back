import { MigrationInterface, QueryRunner } from "typeorm";
export declare class CreateTrials1748798319722 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
