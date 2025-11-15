import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFormTopics1763168461679 implements MigrationInterface {
    name = 'CreateFormTopics1763168461679'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`form_topics\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(255) NOT NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`form_id\` int NOT NULL, \`title\` varchar(255) NOT NULL, \`description\` text NULL, \`order\` int NOT NULL, INDEX \`IDX_823deb82c9bf668099524cba11\` (\`form_id\`), UNIQUE INDEX \`IDX_5707656053d4ff1d94bafd4b2a\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`form_questions\` ADD \`topic_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`form_questions\` ADD \`topicId\` int NULL`);
        await queryRunner.query(`CREATE INDEX \`IDX_24b9656f35b4c59b31be505fa4\` ON \`form_questions\` (\`form_id\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_df6d38637753d11ed7c082b2f5\` ON \`form_questions\` (\`topic_id\`)`);
        await queryRunner.query(`ALTER TABLE \`form_topics\` ADD CONSTRAINT \`FK_823deb82c9bf668099524cba11f\` FOREIGN KEY (\`form_id\`) REFERENCES \`forms\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`form_questions\` ADD CONSTRAINT \`FK_815caf3ff35c9a78d046a41877b\` FOREIGN KEY (\`topicId\`) REFERENCES \`form_topics\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`form_questions\` DROP FOREIGN KEY \`FK_815caf3ff35c9a78d046a41877b\``);
        await queryRunner.query(`ALTER TABLE \`form_topics\` DROP FOREIGN KEY \`FK_823deb82c9bf668099524cba11f\``);
        await queryRunner.query(`DROP INDEX \`IDX_df6d38637753d11ed7c082b2f5\` ON \`form_questions\``);
        await queryRunner.query(`DROP INDEX \`IDX_24b9656f35b4c59b31be505fa4\` ON \`form_questions\``);
        await queryRunner.query(`ALTER TABLE \`form_questions\` DROP COLUMN \`topicId\``);
        await queryRunner.query(`ALTER TABLE \`form_questions\` DROP COLUMN \`topic_id\``);
        await queryRunner.query(`DROP INDEX \`IDX_5707656053d4ff1d94bafd4b2a\` ON \`form_topics\``);
        await queryRunner.query(`DROP INDEX \`IDX_823deb82c9bf668099524cba11\` ON \`form_topics\``);
        await queryRunner.query(`DROP TABLE \`form_topics\``);
    }

}
