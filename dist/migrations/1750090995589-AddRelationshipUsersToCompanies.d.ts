import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddRelationshipUsersToCompanies1750090995589 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
