import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDescriptionToEvaluation1763644013183 implements MigrationInterface {
    name = 'AddDescriptionToEvaluation1763644013183'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`form_questions\` DROP FOREIGN KEY \`FK_815caf3ff35c9a78d046a41877b\``);
        await queryRunner.query(`ALTER TABLE \`form_questions\` DROP COLUMN \`topicId\``);
        await queryRunner.query(`ALTER TABLE \`evaluations\` ADD \`description\` text NULL AFTER \`name\``);
        await queryRunner.query(`ALTER TABLE \`form_questions\` ADD CONSTRAINT \`FK_df6d38637753d11ed7c082b2f54\` FOREIGN KEY (\`topic_id\`) REFERENCES \`form_topics\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`form_questions\` DROP FOREIGN KEY \`FK_df6d38637753d11ed7c082b2f54\``);
        await queryRunner.query(`ALTER TABLE \`evaluations\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`form_questions\` ADD \`topicId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`form_questions\` ADD CONSTRAINT \`FK_815caf3ff35c9a78d046a41877b\` FOREIGN KEY (\`topicId\`) REFERENCES \`form_topics\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
