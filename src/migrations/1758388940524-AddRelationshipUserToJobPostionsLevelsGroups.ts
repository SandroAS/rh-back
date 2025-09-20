import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRelationshipUserToJobPostionsLevelsGroups1758388940524 implements MigrationInterface {
    name = 'AddRelationshipUserToJobPostionsLevelsGroups1758388940524'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_a458f90cd4acaab8b3748c38c9\` ON \`job_positions_levels_groups\``);
        await queryRunner.query(`DROP INDEX \`IDX_538cc737d5ebf06e36021514ac\` ON \`job_positions\``);
        await queryRunner.query(`ALTER TABLE \`job_positions_levels_groups\` ADD \`created_by_user_id\` int NOT NULL AFTER \`account_id\``);
        await queryRunner.query(`ALTER TABLE \`job_positions_levels_groups\` ADD CONSTRAINT \`FK_58563df1cc437107c33ef5d7b86\` FOREIGN KEY (\`created_by_user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`job_positions_levels_groups\` DROP FOREIGN KEY \`FK_58563df1cc437107c33ef5d7b86\``);
        await queryRunner.query(`ALTER TABLE \`job_positions_levels_groups\` DROP COLUMN \`created_by_user_id\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_538cc737d5ebf06e36021514ac\` ON \`job_positions\` (\`job_positions_levels_group_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_a458f90cd4acaab8b3748c38c9\` ON \`job_positions_levels_groups\` (\`job_position_id\`)`);
    }
}
