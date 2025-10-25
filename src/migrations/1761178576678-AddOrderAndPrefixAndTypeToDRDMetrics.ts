import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOrderAndPrefixAndTypeToDRDMetrics1761178576678 implements MigrationInterface {
    name = 'AddOrderAndPrefixAndTypeToDRDMetrics1761178576678'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`drd_metrics\` ADD \`order\` int NOT NULL AFTER \`classification\``);
        await queryRunner.query(`ALTER TABLE \`drd_metrics\` ADD \`prefix\` enum ('>=', '<=') NOT NULL AFTER \`classification\``);
        await queryRunner.query(`ALTER TABLE \`drd_metrics\` DROP COLUMN \`type\``);
        await queryRunner.query(`ALTER TABLE \`drd_metrics\` ADD \`type\` enum ('PERCENTAGE', 'QUANTITY', 'DURATION_MONTHS', 'DURATION_WEEKS', 'DURATION_DAYS', 'DURATION_HOURS', 'DURATION_MINUTES') NOT NULL AFTER \`classification\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`drd_metrics\` DROP COLUMN \`type\``);
        await queryRunner.query(`ALTER TABLE \`drd_metrics\` ADD \`type\` varchar(100) NULL`);
        await queryRunner.query(`ALTER TABLE \`drd_metrics\` DROP COLUMN \`prefix\``);
        await queryRunner.query(`ALTER TABLE \`drd_metrics\` DROP COLUMN \`order\``);
    }

}
