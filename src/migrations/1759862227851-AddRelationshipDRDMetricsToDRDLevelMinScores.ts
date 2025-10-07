import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRelationshipDRDMetricsToDRDLevelMinScores1759862227851 implements MigrationInterface {
    name = 'AddRelationshipDRDMetricsToDRDLevelMinScores1759862227851'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`drd_level_min_scores\` ADD \`drd_metric_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`drd_level_min_scores\` ADD CONSTRAINT \`FK_990a256bcee7ea7ba9b0b1e103c\` FOREIGN KEY (\`drd_metric_id\`) REFERENCES \`drd_metrics\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`drd_level_min_scores\` DROP FOREIGN KEY \`FK_990a256bcee7ea7ba9b0b1e103c\``);
        await queryRunner.query(`ALTER TABLE \`drd_level_min_scores\` DROP COLUMN \`drd_metric_id\``);
    }

}
