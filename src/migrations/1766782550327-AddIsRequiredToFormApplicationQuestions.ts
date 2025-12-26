import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIsRequiredToFormApplicationQuestions1766782550327 implements MigrationInterface {
    name = 'AddIsRequiredToFormApplicationQuestions1766782550327'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`form_application_questions\` ADD \`is_required\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`form_application_questions\` DROP COLUMN \`is_required\``);
    }

}
