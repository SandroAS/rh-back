import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterRelationshiptsOfMetricsAndTopicItensToNullableInDRDLevelsMinScores1761351717012 implements MigrationInterface {
    name = 'AlterRelationshiptsOfMetricsAndTopicItensToNullableInDRDLevelsMinScores1761351717012'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`drd_level_min_scores\` DROP FOREIGN KEY \`FK_a35afc015f0a3de8447869b845e\``);
        await queryRunner.query(`ALTER TABLE \`drd_level_min_scores\` DROP FOREIGN KEY \`FK_990a256bcee7ea7ba9b0b1e103c\``);
        await queryRunner.query(`DROP INDEX \`IDX_ac1b0dc71e0b7628e171300919\` ON \`drd_level_min_scores\``);
        await queryRunner.query(`ALTER TABLE \`drd_level_min_scores\` CHANGE \`drd_topic_item_id\` \`drd_topic_item_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`drd_level_min_scores\` CHANGE \`drd_metric_id\` \`drd_metric_id\` int NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_ac1b0dc71e0b7628e171300919\` ON \`drd_level_min_scores\` (\`drd_topic_item_id\`, \`drd_level_id\`)`);
        await queryRunner.query(`ALTER TABLE \`drd_level_min_scores\` ADD CONSTRAINT \`FK_990a256bcee7ea7ba9b0b1e103c\` FOREIGN KEY (\`drd_metric_id\`) REFERENCES \`drd_metrics\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`drd_level_min_scores\` ADD CONSTRAINT \`FK_a35afc015f0a3de8447869b845e\` FOREIGN KEY (\`drd_topic_item_id\`) REFERENCES \`drd_topic_items\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`drd_level_min_scores\` DROP FOREIGN KEY \`FK_a35afc015f0a3de8447869b845e\``);
        await queryRunner.query(`ALTER TABLE \`drd_level_min_scores\` DROP FOREIGN KEY \`FK_990a256bcee7ea7ba9b0b1e103c\``);
        await queryRunner.query(`DROP INDEX \`IDX_ac1b0dc71e0b7628e171300919\` ON \`drd_level_min_scores\``);
        await queryRunner.query(`ALTER TABLE \`drd_level_min_scores\` CHANGE \`drd_metric_id\` \`drd_metric_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`drd_level_min_scores\` CHANGE \`drd_topic_item_id\` \`drd_topic_item_id\` int NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_ac1b0dc71e0b7628e171300919\` ON \`drd_level_min_scores\` (\`drd_topic_item_id\`, \`drd_level_id\`)`);
        await queryRunner.query(`ALTER TABLE \`drd_level_min_scores\` ADD CONSTRAINT \`FK_990a256bcee7ea7ba9b0b1e103c\` FOREIGN KEY (\`drd_metric_id\`) REFERENCES \`drd_metrics\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`drd_level_min_scores\` ADD CONSTRAINT \`FK_a35afc015f0a3de8447869b845e\` FOREIGN KEY (\`drd_topic_item_id\`) REFERENCES \`drd_topic_items\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
