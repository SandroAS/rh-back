import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFormApplicationTopics1763843273549 implements MigrationInterface {
    name = 'CreateFormApplicationTopics1763843273549'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`form_application_topics\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(255) NOT NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`form_application_id\` int NOT NULL, \`base_form_topic_id\` int NOT NULL, \`drd_topic_id\` int NULL, \`title\` varchar(255) NOT NULL, \`description\` text NULL, \`order\` int NOT NULL, INDEX \`IDX_fb18d7392199ad55036a27af8b\` (\`form_application_id\`), INDEX \`IDX_1e6877be518320baa2a5f50c5e\` (\`base_form_topic_id\`), INDEX \`IDX_d61d338f54fc3508b33415c680\` (\`drd_topic_id\`), UNIQUE INDEX \`IDX_61d13efd071d348a0ff90cbb2d\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`form_application_questions\` ADD \`form_application_topic_id\` int NULL`);
        await queryRunner.query(`CREATE INDEX \`IDX_1a2613a689bcca6d9f25425818\` ON \`form_application_questions\` (\`form_application_topic_id\`)`);
        await queryRunner.query(`ALTER TABLE \`form_application_topics\` ADD CONSTRAINT \`FK_fb18d7392199ad55036a27af8b4\` FOREIGN KEY (\`form_application_id\`) REFERENCES \`form_applications\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`form_application_topics\` ADD CONSTRAINT \`FK_1e6877be518320baa2a5f50c5e0\` FOREIGN KEY (\`base_form_topic_id\`) REFERENCES \`form_topics\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`form_application_topics\` ADD CONSTRAINT \`FK_d61d338f54fc3508b33415c6809\` FOREIGN KEY (\`drd_topic_id\`) REFERENCES \`drd_topics\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`form_application_questions\` ADD CONSTRAINT \`FK_1a2613a689bcca6d9f254258184\` FOREIGN KEY (\`form_application_topic_id\`) REFERENCES \`form_application_topics\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`form_application_questions\` DROP FOREIGN KEY \`FK_1a2613a689bcca6d9f254258184\``);
        await queryRunner.query(`ALTER TABLE \`form_application_topics\` DROP FOREIGN KEY \`FK_d61d338f54fc3508b33415c6809\``);
        await queryRunner.query(`ALTER TABLE \`form_application_topics\` DROP FOREIGN KEY \`FK_1e6877be518320baa2a5f50c5e0\``);
        await queryRunner.query(`ALTER TABLE \`form_application_topics\` DROP FOREIGN KEY \`FK_fb18d7392199ad55036a27af8b4\``);
        await queryRunner.query(`DROP INDEX \`IDX_1a2613a689bcca6d9f25425818\` ON \`form_application_questions\``);
        await queryRunner.query(`ALTER TABLE \`form_application_questions\` DROP COLUMN \`form_application_topic_id\``);
        await queryRunner.query(`DROP INDEX \`IDX_61d13efd071d348a0ff90cbb2d\` ON \`form_application_topics\``);
        await queryRunner.query(`DROP INDEX \`IDX_d61d338f54fc3508b33415c680\` ON \`form_application_topics\``);
        await queryRunner.query(`DROP INDEX \`IDX_1e6877be518320baa2a5f50c5e\` ON \`form_application_topics\``);
        await queryRunner.query(`DROP INDEX \`IDX_fb18d7392199ad55036a27af8b\` ON \`form_application_topics\``);
        await queryRunner.query(`DROP TABLE \`form_application_topics\``);
    }

}
