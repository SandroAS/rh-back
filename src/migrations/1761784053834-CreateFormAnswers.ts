import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFormAnswers1761784053834 implements MigrationInterface {
    name = 'CreateFormAnswers1761784053834'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`form_answers\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(255) NOT NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`response_id\` int NOT NULL, \`application_question_id\` int NOT NULL, \`text_value\` text NULL, \`application_option_id\` int NULL, UNIQUE INDEX \`IDX_4272b9591aa587e3f96f0144c4\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`form_answers\` ADD CONSTRAINT \`FK_711629876e9f2ad2c99f559975e\` FOREIGN KEY (\`response_id\`) REFERENCES \`form_responses\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`form_answers\` ADD CONSTRAINT \`FK_d458fdc5932ee7323e7ab68923f\` FOREIGN KEY (\`application_question_id\`) REFERENCES \`form_application_questions\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`form_answers\` ADD CONSTRAINT \`FK_c53de45f4dec43a17512c9ef732\` FOREIGN KEY (\`application_option_id\`) REFERENCES \`form_application_question_options\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`form_answers\` DROP FOREIGN KEY \`FK_c53de45f4dec43a17512c9ef732\``);
        await queryRunner.query(`ALTER TABLE \`form_answers\` DROP FOREIGN KEY \`FK_d458fdc5932ee7323e7ab68923f\``);
        await queryRunner.query(`ALTER TABLE \`form_answers\` DROP FOREIGN KEY \`FK_711629876e9f2ad2c99f559975e\``);
        await queryRunner.query(`DROP INDEX \`IDX_4272b9591aa587e3f96f0144c4\` ON \`form_answers\``);
        await queryRunner.query(`DROP TABLE \`form_answers\``);
    }

}
