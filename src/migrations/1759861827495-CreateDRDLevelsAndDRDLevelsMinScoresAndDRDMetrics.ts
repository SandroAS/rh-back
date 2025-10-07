import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDRDLevelsAndDRDLevelsMinScoresAndDRDMetrics1759861827495 implements MigrationInterface {
    name = 'CreateDRDLevelsAndDRDLevelsMinScoresAndDRDMetrics1759861827495'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`drd_levels\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(255) NOT NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`drd_id\` int NOT NULL, \`name\` varchar(100) NOT NULL, \`order\` int NOT NULL DEFAULT '0', UNIQUE INDEX \`IDX_e2fee4fcb6844444ce3c82d966\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`drd_level_min_scores\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(255) NOT NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`drd_topic_item_id\` int NOT NULL, \`drd_level_id\` int NOT NULL, \`min_score\` int UNSIGNED NOT NULL DEFAULT '0', UNIQUE INDEX \`IDX_5999386bae3222aa2097bbfa4a\` (\`uuid\`), UNIQUE INDEX \`IDX_ac1b0dc71e0b7628e171300919\` (\`drd_topic_item_id\`, \`drd_level_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`drd_metrics\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(255) NOT NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`drd_id\` int NOT NULL, \`name\` varchar(150) NOT NULL, \`classification\` varchar(100) NULL, \`type\` varchar(100) NULL, UNIQUE INDEX \`IDX_b6204d912797514623dd12ba8e\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`drd_levels\` ADD CONSTRAINT \`FK_7179d36b6b4d1536c0bd18d3e4d\` FOREIGN KEY (\`drd_id\`) REFERENCES \`drds\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`drd_level_min_scores\` ADD CONSTRAINT \`FK_a35afc015f0a3de8447869b845e\` FOREIGN KEY (\`drd_topic_item_id\`) REFERENCES \`drd_topic_items\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`drd_level_min_scores\` ADD CONSTRAINT \`FK_de70dfc5111cf56ddd4354d294e\` FOREIGN KEY (\`drd_level_id\`) REFERENCES \`drd_levels\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`drd_metrics\` ADD CONSTRAINT \`FK_5aa211fdf58aa9c8a24766b9d5b\` FOREIGN KEY (\`drd_id\`) REFERENCES \`drds\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`drd_metrics\` DROP FOREIGN KEY \`FK_5aa211fdf58aa9c8a24766b9d5b\``);
        await queryRunner.query(`ALTER TABLE \`drd_level_min_scores\` DROP FOREIGN KEY \`FK_de70dfc5111cf56ddd4354d294e\``);
        await queryRunner.query(`ALTER TABLE \`drd_level_min_scores\` DROP FOREIGN KEY \`FK_a35afc015f0a3de8447869b845e\``);
        await queryRunner.query(`ALTER TABLE \`drd_levels\` DROP FOREIGN KEY \`FK_7179d36b6b4d1536c0bd18d3e4d\``);
        await queryRunner.query(`DROP INDEX \`IDX_b6204d912797514623dd12ba8e\` ON \`drd_metrics\``);
        await queryRunner.query(`DROP TABLE \`drd_metrics\``);
        await queryRunner.query(`DROP INDEX \`IDX_ac1b0dc71e0b7628e171300919\` ON \`drd_level_min_scores\``);
        await queryRunner.query(`DROP INDEX \`IDX_5999386bae3222aa2097bbfa4a\` ON \`drd_level_min_scores\``);
        await queryRunner.query(`DROP TABLE \`drd_level_min_scores\``);
        await queryRunner.query(`DROP INDEX \`IDX_e2fee4fcb6844444ce3c82d966\` ON \`drd_levels\``);
        await queryRunner.query(`DROP TABLE \`drd_levels\``);
    }

}
