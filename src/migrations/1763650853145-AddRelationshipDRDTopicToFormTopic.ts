import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRelationshipDRDTopicToFormTopic1763650853145 implements MigrationInterface {
    name = 'AddRelationshipDRDTopicToFormTopic1763650853145'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`form_topics\` ADD \`drd_topic_id\` int NULL AFTER \`form_id\``);
        await queryRunner.query(`CREATE INDEX \`IDX_843910feb1d519c14b2694a4e3\` ON \`form_topics\` (\`drd_topic_id\`)`);
        await queryRunner.query(`ALTER TABLE \`form_topics\` ADD CONSTRAINT \`FK_843910feb1d519c14b2694a4e32\` FOREIGN KEY (\`drd_topic_id\`) REFERENCES \`drd_topics\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`form_topics\` DROP FOREIGN KEY \`FK_843910feb1d519c14b2694a4e32\``);
        await queryRunner.query(`DROP INDEX \`IDX_843910feb1d519c14b2694a4e3\` ON \`form_topics\``);
        await queryRunner.query(`ALTER TABLE \`form_topics\` DROP COLUMN \`drd_topic_id\``);
    }

}
