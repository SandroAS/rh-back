import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateJobPositionsLevelsAndGroups1755476089457 implements MigrationInterface {
    name = 'CreateJobPositionsLevelsAndGroups1755476089457'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`job_positions_levels\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(255) NOT NULL, \`account_id\` int NOT NULL, \`name\` varchar(255) NOT NULL, \`salary\` decimal(10,2) NOT NULL DEFAULT '0.00', \`job_positions_levels_group_id\` int NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, UNIQUE INDEX \`IDX_12bf2c0c36de280c422f4962d0\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`job_positions_levels_groups\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(255) NOT NULL, \`account_id\` int NOT NULL, \`name\` varchar(255) NOT NULL, \`job_position_id\` int NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, UNIQUE INDEX \`IDX_1ad4ddfbc7a5fba37a42caed47\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`job_positions_levels\` ADD CONSTRAINT \`FK_f9d0139b00aad47cd5695f450ad\` FOREIGN KEY (\`account_id\`) REFERENCES \`accounts\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`job_positions_levels\` ADD CONSTRAINT \`FK_6f1fd79e24371d9cabbb3168247\` FOREIGN KEY (\`job_positions_levels_group_id\`) REFERENCES \`job_positions_levels_groups\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`job_positions_levels_groups\` ADD CONSTRAINT \`FK_fc4ece7f5e7717d8b8593648376\` FOREIGN KEY (\`account_id\`) REFERENCES \`accounts\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`job_positions_levels_groups\` ADD CONSTRAINT \`FK_a458f90cd4acaab8b3748c38c92\` FOREIGN KEY (\`job_position_id\`) REFERENCES \`job_positions\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`job_positions_levels_groups\` DROP FOREIGN KEY \`FK_a458f90cd4acaab8b3748c38c92\``);
        await queryRunner.query(`ALTER TABLE \`job_positions_levels_groups\` DROP FOREIGN KEY \`FK_fc4ece7f5e7717d8b8593648376\``);
        await queryRunner.query(`ALTER TABLE \`job_positions_levels\` DROP FOREIGN KEY \`FK_6f1fd79e24371d9cabbb3168247\``);
        await queryRunner.query(`ALTER TABLE \`job_positions_levels\` DROP FOREIGN KEY \`FK_f9d0139b00aad47cd5695f450ad\``);
        await queryRunner.query(`DROP INDEX \`IDX_1ad4ddfbc7a5fba37a42caed47\` ON \`job_positions_levels_groups\``);
        await queryRunner.query(`DROP TABLE \`job_positions_levels_groups\``);
        await queryRunner.query(`DROP INDEX \`IDX_12bf2c0c36de280c422f4962d0\` ON \`job_positions_levels\``);
        await queryRunner.query(`DROP TABLE \`job_positions_levels\``);
    }

}
