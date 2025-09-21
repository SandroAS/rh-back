import { MigrationInterface, QueryRunner } from "typeorm";

export class FixRelationshipJobPositionsToJobPositionsLevelsGroups1758478774419 implements MigrationInterface {
    name = 'FixRelationshipJobPositionsToJobPositionsLevelsGroups1758478774419'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`job_positions_levels_groups\` DROP FOREIGN KEY \`FK_a458f90cd4acaab8b3748c38c92\``);
        await queryRunner.query(`ALTER TABLE \`job_positions\` DROP FOREIGN KEY \`FK_538cc737d5ebf06e36021514ac4\``);
        await queryRunner.query(`DROP INDEX \`REL_a458f90cd4acaab8b3748c38c9\` ON \`job_positions_levels_groups\``);
        await queryRunner.query(`ALTER TABLE \`job_positions_levels_groups\` DROP COLUMN \`job_position_id\``);
        await queryRunner.query(`ALTER TABLE \`job_positions\` ADD CONSTRAINT \`FK_538cc737d5ebf06e36021514ac4\` FOREIGN KEY (\`job_positions_levels_group_id\`) REFERENCES \`job_positions_levels_groups\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`job_positions\` DROP FOREIGN KEY \`FK_538cc737d5ebf06e36021514ac4\``);
        await queryRunner.query(`ALTER TABLE \`job_positions_levels_groups\` ADD \`job_position_id\` int NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_a458f90cd4acaab8b3748c38c9\` ON \`job_positions_levels_groups\` (\`job_position_id\`)`);
        await queryRunner.query(`ALTER TABLE \`job_positions\` ADD CONSTRAINT \`FK_538cc737d5ebf06e36021514ac4\` FOREIGN KEY (\`job_positions_levels_group_id\`) REFERENCES \`job_positions_levels_groups\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`job_positions_levels_groups\` ADD CONSTRAINT \`FK_a458f90cd4acaab8b3748c38c92\` FOREIGN KEY (\`job_position_id\`) REFERENCES \`job_positions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
