import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFormQuestionOptions1761781849335 implements MigrationInterface {
    name = 'CreateFormQuestionOptions1761781849335'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`form_question_options\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(255) NOT NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`question_id\` int NOT NULL, \`text\` varchar(255) NOT NULL, \`order\` int NOT NULL, UNIQUE INDEX \`IDX_c3a39c0b0e196711dd8c0ab967\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`form_question_options\` ADD CONSTRAINT \`FK_4466bfbad21284841d05861dd64\` FOREIGN KEY (\`question_id\`) REFERENCES \`form_questions\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`form_question_options\` DROP FOREIGN KEY \`FK_4466bfbad21284841d05861dd64\``);
        await queryRunner.query(`DROP INDEX \`IDX_c3a39c0b0e196711dd8c0ab967\` ON \`form_question_options\``);
        await queryRunner.query(`DROP TABLE \`form_question_options\``);
    }

}
