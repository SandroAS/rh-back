import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRateEnumFormQuestionsType1763167168838 implements MigrationInterface {
    name = 'AddRateEnumFormQuestionsType1763167168838'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`form_application_questions\` CHANGE \`type\` \`type\` enum ('RATE', 'NUMBER', 'SHORT_TEXT', 'LONG_TEXT', 'SINGLE_CHOICE', 'MULTI_CHOICE', 'DROPDOWN') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`form_questions\` CHANGE \`type\` \`type\` enum ('RATE', 'NUMBER', 'SHORT_TEXT', 'LONG_TEXT', 'SINGLE_CHOICE', 'MULTI_CHOICE', 'DROPDOWN') NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`form_questions\` CHANGE \`type\` \`type\` enum ('SHORT_TEXT', 'LONG_TEXT', 'SINGLE_CHOICE', 'MULTI_CHOICE', 'DROPDOWN') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`form_application_questions\` CHANGE \`type\` \`type\` enum ('SHORT_TEXT', 'LONG_TEXT', 'SINGLE_CHOICE', 'MULTI_CHOICE', 'DROPDOWN') NOT NULL`);
    }

}
