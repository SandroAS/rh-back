import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableJobPositionsFixRelationships1756048651408 implements MigrationInterface {
    name = 'AlterTableJobPositionsFixRelationships1756048651408'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`job_positions_levels_groups\` DROP FOREIGN KEY \`FK_a458f90cd4acaab8b3748c38c92\``);
        await queryRunner.query(`ALTER TABLE \`job_positions\` ADD \`job_positions_levels_group_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`job_positions\` ADD UNIQUE INDEX \`IDX_538cc737d5ebf06e36021514ac\` (\`job_positions_levels_group_id\`)`);
        await queryRunner.query(`ALTER TABLE \`job_positions_levels_groups\` ADD UNIQUE INDEX \`IDX_a458f90cd4acaab8b3748c38c9\` (\`job_position_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_a458f90cd4acaab8b3748c38c9\` ON \`job_positions_levels_groups\` (\`job_position_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_538cc737d5ebf06e36021514ac\` ON \`job_positions\` (\`job_positions_levels_group_id\`)`);
        await queryRunner.query(`ALTER TABLE \`job_positions_levels_groups\` ADD CONSTRAINT \`FK_a458f90cd4acaab8b3748c38c92\` FOREIGN KEY (\`job_position_id\`) REFERENCES \`job_positions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`job_positions\` ADD CONSTRAINT \`FK_538cc737d5ebf06e36021514ac4\` FOREIGN KEY (\`job_positions_levels_group_id\`) REFERENCES \`job_positions_levels_groups\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`job_positions\` DROP FOREIGN KEY \`FK_538cc737d5ebf06e36021514ac4\``);
        await queryRunner.query(`ALTER TABLE \`job_positions_levels_groups\` DROP FOREIGN KEY \`FK_a458f90cd4acaab8b3748c38c92\``);
        await queryRunner.query(`DROP INDEX \`REL_538cc737d5ebf06e36021514ac\` ON \`job_positions\``);
        await queryRunner.query(`DROP INDEX \`REL_a458f90cd4acaab8b3748c38c9\` ON \`job_positions_levels_groups\``);
        await queryRunner.query(`ALTER TABLE \`job_positions_levels_groups\` DROP INDEX \`IDX_a458f90cd4acaab8b3748c38c9\``);
        await queryRunner.query(`ALTER TABLE \`job_positions\` DROP INDEX \`IDX_538cc737d5ebf06e36021514ac\``);
        await queryRunner.query(`ALTER TABLE \`job_positions\` DROP COLUMN \`job_positions_levels_group_id\``);
        await queryRunner.query(`ALTER TABLE \`job_positions_levels_groups\` ADD CONSTRAINT \`FK_a458f90cd4acaab8b3748c38c92\` FOREIGN KEY (\`job_position_id\`) REFERENCES \`job_positions\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

}
