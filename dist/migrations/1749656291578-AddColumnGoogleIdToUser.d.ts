import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddColumnGoogleIdToUser1749656291578 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
