import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOrderToJobPositionsLevels1758482011505 implements MigrationInterface {
    name = 'AddOrderToJobPositionsLevels1758482011505'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`job_positions_levels\` ADD \`order\` int NOT NULL DEFAULT '0' AFTER \`salary\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`job_positions_levels\` DROP COLUMN \`order\``);
    }

}
