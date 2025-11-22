import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAccountIdNameDescriptionRateDrdToEvaluationApplication1763771055522 implements MigrationInterface {
    name = 'AddAccountIdNameDescriptionRateDrdToEvaluationApplication1763771055522'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`evaluation_applications\` ADD \`account_id\` int NOT NULL AFTER \`form_application_id\``);
        await queryRunner.query(`ALTER TABLE \`evaluation_applications\` ADD \`drd_id\` int NULL AFTER \`form_application_id\``);
        await queryRunner.query(`ALTER TABLE \`evaluation_applications\` ADD \`name\` varchar(255) NOT NULL AFTER \`form_application_id\``);
        await queryRunner.query(`ALTER TABLE \`evaluation_applications\` ADD \`description\` text NULL AFTER \`form_application_id\``);
        await queryRunner.query(`ALTER TABLE \`evaluation_applications\` ADD \`rate\` decimal(5,2) NOT NULL DEFAULT '0.00' AFTER \`form_application_id\``);
        await queryRunner.query(`ALTER TABLE \`evaluation_applications\` ADD CONSTRAINT \`FK_2fe49db2d870912c9d6bf23ebbd\` FOREIGN KEY (\`drd_id\`) REFERENCES \`drds\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`evaluation_applications\` DROP FOREIGN KEY \`FK_2fe49db2d870912c9d6bf23ebbd\``);
        await queryRunner.query(`ALTER TABLE \`evaluation_applications\` DROP COLUMN \`rate\``);
        await queryRunner.query(`ALTER TABLE \`evaluation_applications\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`evaluation_applications\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`evaluation_applications\` DROP COLUMN \`drd_id\``);
        await queryRunner.query(`ALTER TABLE \`evaluation_applications\` DROP COLUMN \`account_id\``);
    }

}
