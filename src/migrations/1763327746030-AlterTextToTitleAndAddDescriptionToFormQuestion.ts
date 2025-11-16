import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTextToTitleAndAddDescriptionToFormQuestion1763327746030 implements MigrationInterface {
    name = 'AlterTextToTitleAndAddDescriptionToFormQuestion1763327746030'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`form_questions\` DROP COLUMN \`text\``);
        await queryRunner.query(`ALTER TABLE \`form_questions\` ADD \`title\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`form_questions\` ADD \`description\` text NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`form_questions\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`form_questions\` DROP COLUMN \`title\``);
        await queryRunner.query(`ALTER TABLE \`form_questions\` ADD \`text\` text NOT NULL`);
    }

}
