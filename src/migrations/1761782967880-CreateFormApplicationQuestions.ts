import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFormApplicationQuestions1761782967880 implements MigrationInterface {
    name = 'CreateFormApplicationQuestions1761782967880'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`form_application_questions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(255) NOT NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`application_id\` int NOT NULL, \`base_question_id\` int NOT NULL, \`text\` text NOT NULL, \`type\` enum ('SHORT_TEXT', 'LONG_TEXT', 'SINGLE_CHOICE', 'MULTI_CHOICE', 'DROPDOWN') NOT NULL, \`order\` int NOT NULL, UNIQUE INDEX \`IDX_28ce9c980c158f2366306e0fd7\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`form_application_questions\` ADD CONSTRAINT \`FK_30098d2cb6d0e84f8237c54c63e\` FOREIGN KEY (\`application_id\`) REFERENCES \`form_applications\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`form_application_questions\` ADD CONSTRAINT \`FK_d8c10102e0cb52597a5d83ff962\` FOREIGN KEY (\`base_question_id\`) REFERENCES \`form_questions\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`form_application_questions\` DROP FOREIGN KEY \`FK_d8c10102e0cb52597a5d83ff962\``);
        await queryRunner.query(`ALTER TABLE \`form_application_questions\` DROP FOREIGN KEY \`FK_30098d2cb6d0e84f8237c54c63e\``);
        await queryRunner.query(`DROP INDEX \`IDX_28ce9c980c158f2366306e0fd7\` ON \`form_application_questions\``);
        await queryRunner.query(`DROP TABLE \`form_application_questions\``);
    }

}
