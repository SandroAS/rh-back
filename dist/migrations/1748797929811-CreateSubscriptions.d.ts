import { MigrationInterface, QueryRunner } from "typeorm";
export declare class CreateSubscriptions1748797929811 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
