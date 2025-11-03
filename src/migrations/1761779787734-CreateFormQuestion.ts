import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFormQuestion1761779787734 implements MigrationInterface {
    name = 'CreateFormQuestion1761779787734'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`form_questions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(255) NOT NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`form_id\` int NOT NULL, \`text\` text NOT NULL, \`type\` enum ('SHORT_TEXT', 'LONG_TEXT', 'SINGLE_CHOICE', 'MULTI_CHOICE', 'DROPDOWN') NOT NULL, \`order\` int NOT NULL, \`is_required\` tinyint NOT NULL DEFAULT 0, UNIQUE INDEX \`IDX_02e2feb46e05993a6ee93ce78b\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`form_questions\` ADD CONSTRAINT \`FK_24b9656f35b4c59b31be505fa47\` FOREIGN KEY (\`form_id\`) REFERENCES \`forms\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`form_questions\` DROP FOREIGN KEY \`FK_24b9656f35b4c59b31be505fa47\``);
        await queryRunner.query(`DROP INDEX \`IDX_02e2feb46e05993a6ee93ce78b\` ON \`form_questions\``);
        await queryRunner.query(`DROP TABLE \`form_questions\``);
    }

}
