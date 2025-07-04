import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddColumnProfileImgUrlToUsers1749676379854 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
