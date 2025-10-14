import { MigrationInterface, QueryRunner } from "typeorm";

export class FixJobPositionLevelsGroupRelation1760484904227 implements MigrationInterface {
    name = 'FixJobPositionLevelsGroupRelation1760484904227'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`job_positions\` DROP FOREIGN KEY \`FK_538cc737d5ebf06e36021514ac4\``);
        await queryRunner.query(`DROP INDEX \`REL_538cc737d5ebf06e36021514ac\` ON \`job_positions\``);
        await queryRunner.query(`ALTER TABLE \`job_positions\` MODIFY COLUMN \`job_positions_levels_group_id\` INT NULL AFTER \`base_salary\``);
        await queryRunner.query(`ALTER TABLE \`job_positions\` ADD CONSTRAINT \`FK_job_positions_levels_group_id\` FOREIGN KEY (\`job_positions_levels_group_id\`) REFERENCES \`job_positions_levels_groups\` (\`id\`) ON DELETE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`job_positions\` MODIFY COLUMN \`job_positions_levels_group_id\` INT NULL AFTER \`updated_at\``);
    }
}