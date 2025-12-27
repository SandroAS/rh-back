import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNumberValueToFormAnswer1766848472823 implements MigrationInterface {
    name = 'AddNumberValueToFormAnswer1766848472823'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`form_answers\` ADD \`number_value\` decimal(10,2) NULL AFTER \`text_value\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`form_answers\` DROP COLUMN \`number_value\``);
    }

}
