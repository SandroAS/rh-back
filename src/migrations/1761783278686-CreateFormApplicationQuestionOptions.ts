import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFormApplicationQuestionOptions1761783278686 implements MigrationInterface {
    name = 'CreateFormApplicationQuestionOptions1761783278686'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`form_application_question_options\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(255) NOT NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`application_question_id\` int NOT NULL, \`base_option_id\` int NOT NULL, \`text\` varchar(255) NOT NULL, \`order\` int NOT NULL, UNIQUE INDEX \`IDX_72787f6ad0cd2b5a2ff0f05e7d\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`form_application_question_options\` ADD CONSTRAINT \`FK_fe672f9fe1626edef605064a525\` FOREIGN KEY (\`application_question_id\`) REFERENCES \`form_application_questions\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`form_application_question_options\` ADD CONSTRAINT \`FK_864fc104cdfbeb81879794a0d35\` FOREIGN KEY (\`base_option_id\`) REFERENCES \`form_question_options\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`form_application_question_options\` DROP FOREIGN KEY \`FK_864fc104cdfbeb81879794a0d35\``);
        await queryRunner.query(`ALTER TABLE \`form_application_question_options\` DROP FOREIGN KEY \`FK_fe672f9fe1626edef605064a525\``);
        await queryRunner.query(`DROP INDEX \`IDX_72787f6ad0cd2b5a2ff0f05e7d\` ON \`form_application_question_options\``);
        await queryRunner.query(`DROP TABLE \`form_application_question_options\``);
    }

}
