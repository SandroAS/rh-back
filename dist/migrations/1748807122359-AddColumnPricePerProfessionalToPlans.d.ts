import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddColumnPricePerProfessionalToPlans1748807122359 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
