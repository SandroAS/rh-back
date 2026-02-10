import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFinishedAtToEvaluationApplications1770682730000 implements MigrationInterface {
    name = 'AddFinishedAtToEvaluationApplications1770682730000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`evaluation_applications\` ADD \`finished_at\` timestamp NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`evaluation_applications\` DROP COLUMN \`finished_at\``);
    }
}
