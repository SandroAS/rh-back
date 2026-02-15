import { MigrationInterface, QueryRunner } from "typeorm";

export class AddJobPositionCurrentLevelIdToUsers1771185294734 implements MigrationInterface {
    name = 'AddJobPositionCurrentLevelIdToUsers1771185294734'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_users_job_positions_current_level\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`job_positions_current_level_uuid\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_733816c2df5cfef34dfd7af223f\` FOREIGN KEY (\`job_positions_current_level_id\`) REFERENCES \`job_positions_levels\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_733816c2df5cfef34dfd7af223f\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`job_positions_current_level_uuid\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_users_job_positions_current_level\` FOREIGN KEY (\`job_positions_current_level_uuid\`) REFERENCES \`job_positions_levels\`(\`uuid\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

}
