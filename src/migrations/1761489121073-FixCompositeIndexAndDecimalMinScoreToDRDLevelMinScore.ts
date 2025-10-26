import { MigrationInterface, QueryRunner } from "typeorm";

export class FixCompositeIndexAndDecimalMinScoreToDRDLevelMinScore1761489121073 implements MigrationInterface {
    name = 'FixCompositeIndexAndDecimalMinScoreToDRDLevelMinScore1761489121073'
    
    private readonly FK_TOPIC_ITEM_NAME = 'FK_a35afc015f0a3de8447869b845e';
    private readonly FK_LEVEL_NAME = 'FK_de70dfc5111cf56ddd4354d294e';
    private readonly OLD_UNIQUE_INDEX = 'IDX_ac1b0dc71e0b7628e171300919';
    private readonly NEW_UNIQUE_INDEX = 'IDX_284d54f6695ae45b3009ea6664';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`drd_level_min_scores\` DROP FOREIGN KEY \`${this.FK_TOPIC_ITEM_NAME}\``);
        await queryRunner.query(`ALTER TABLE \`drd_level_min_scores\` DROP FOREIGN KEY \`${this.FK_LEVEL_NAME}\``);
        await queryRunner.query(`DROP INDEX \`${this.OLD_UNIQUE_INDEX}\` ON \`drd_level_min_scores\``);
        await queryRunner.query(`ALTER TABLE \`drd_level_min_scores\` DROP COLUMN \`min_score\``);
        await queryRunner.query(`ALTER TABLE \`drd_level_min_scores\` ADD \`min_score\` decimal(9,2) UNSIGNED NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`${this.NEW_UNIQUE_INDEX}\` ON \`drd_level_min_scores\` (\`drd_level_id\`, \`drd_topic_item_id\`, \`drd_metric_id\`)`);
        await queryRunner.query(`ALTER TABLE \`drd_level_min_scores\` ADD CONSTRAINT \`${this.FK_TOPIC_ITEM_NAME}\` FOREIGN KEY (\`drd_topic_item_id\`) REFERENCES \`drd_topic_items\`(\`id\`) ON DELETE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`drd_level_min_scores\` ADD CONSTRAINT \`${this.FK_LEVEL_NAME}\` FOREIGN KEY (\`drd_level_id\`) REFERENCES \`drd_levels\`(\`id\`) ON DELETE CASCADE`);
    }
    
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`drd_level_min_scores\` DROP FOREIGN KEY \`${this.FK_TOPIC_ITEM_NAME}\``);
        await queryRunner.query(`ALTER TABLE \`drd_level_min_scores\` DROP FOREIGN KEY \`${this.FK_LEVEL_NAME}\``);
        await queryRunner.query(`DROP INDEX \`${this.NEW_UNIQUE_INDEX}\` ON \`drd_level_min_scores\``);
        await queryRunner.query(`ALTER TABLE \`drd_level_min_scores\` DROP COLUMN \`min_score\``);
        await queryRunner.query(`ALTER TABLE \`drd_level_min_scores\` ADD \`min_score\` int UNSIGNED NOT NULL DEFAULT '0'`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`${this.OLD_UNIQUE_INDEX}\` ON \`drd_level_min_scores\` (\`drd_topic_item_id\`, \`drd_level_id\`)`);
        await queryRunner.query(`ALTER TABLE \`drd_level_min_scores\` ADD CONSTRAINT \`${this.FK_TOPIC_ITEM_NAME}\` FOREIGN KEY (\`drd_topic_item_id\`) REFERENCES \`drd_topic_items\`(\`id\`) ON DELETE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`drd_level_min_scores\` ADD CONSTRAINT \`${this.FK_LEVEL_NAME}\` FOREIGN KEY (\`drd_level_id\`) REFERENCES \`drd_levels\`(\`id\`) ON DELETE CASCADE`);
    }
}