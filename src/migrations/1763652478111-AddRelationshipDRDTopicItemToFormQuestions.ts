import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRelationshipDRDTopicItemToFormQuestions1763652478111 implements MigrationInterface {
    name = 'AddRelationshipDRDTopicItemToFormQuestions1763652478111'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`form_questions\` ADD \`drd_topic_item_id\` int NULL AFTER \`topic_id\``);
        await queryRunner.query(`CREATE INDEX \`IDX_1bd5ecf22efadf8c93f62bcb21\` ON \`form_questions\` (\`drd_topic_item_id\`)`);
        await queryRunner.query(`ALTER TABLE \`form_questions\` ADD CONSTRAINT \`FK_1bd5ecf22efadf8c93f62bcb214\` FOREIGN KEY (\`drd_topic_item_id\`) REFERENCES \`drd_topic_items\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`form_questions\` DROP FOREIGN KEY \`FK_1bd5ecf22efadf8c93f62bcb214\``);
        await queryRunner.query(`DROP INDEX \`IDX_1bd5ecf22efadf8c93f62bcb21\` ON \`form_questions\``);
        await queryRunner.query(`ALTER TABLE \`form_questions\` DROP COLUMN \`drd_topic_item_id\``);
    }

}
