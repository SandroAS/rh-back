import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFormAnswerMultiOption1761784236092 implements MigrationInterface {
    name = 'CreateFormAnswerMultiOption1761784236092'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`form_answer_multi_options\` (\`answer_id\` int NOT NULL, \`application_option_id\` int NOT NULL, PRIMARY KEY (\`answer_id\`, \`application_option_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`form_answer_multi_options\` ADD CONSTRAINT \`FK_735c77f349f8752c38e1f0c23d3\` FOREIGN KEY (\`answer_id\`) REFERENCES \`form_answers\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`form_answer_multi_options\` ADD CONSTRAINT \`FK_531b96e7ddd9fdcbb31fecce9de\` FOREIGN KEY (\`application_option_id\`) REFERENCES \`form_application_question_options\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`form_answer_multi_options\` DROP FOREIGN KEY \`FK_531b96e7ddd9fdcbb31fecce9de\``);
        await queryRunner.query(`ALTER TABLE \`form_answer_multi_options\` DROP FOREIGN KEY \`FK_735c77f349f8752c38e1f0c23d3\``);
        await queryRunner.query(`DROP TABLE \`form_answer_multi_options\``);
    }

}
