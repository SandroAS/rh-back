import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOrderToDRDTopicAndDRDTopicItens1760579566119 implements MigrationInterface {
    name = 'AddOrderToDRDTopicAndDRDTopicItens1760579566119'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`job_positions\` DROP FOREIGN KEY \`FK_job_positions_levels_group_id\``);
        await queryRunner.query(`ALTER TABLE \`drd_topic_items\` ADD \`order\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`drd_topics\` ADD \`order\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`job_positions\` ADD CONSTRAINT \`FK_538cc737d5ebf06e36021514ac4\` FOREIGN KEY (\`job_positions_levels_group_id\`) REFERENCES \`job_positions_levels_groups\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`job_positions\` DROP FOREIGN KEY \`FK_538cc737d5ebf06e36021514ac4\``);
        await queryRunner.query(`ALTER TABLE \`drd_topics\` DROP COLUMN \`order\``);
        await queryRunner.query(`ALTER TABLE \`drd_topic_items\` DROP COLUMN \`order\``);
        await queryRunner.query(`ALTER TABLE \`job_positions\` ADD CONSTRAINT \`FK_job_positions_levels_group_id\` FOREIGN KEY (\`job_positions_levels_group_id\`) REFERENCES \`job_positions_levels_groups\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
