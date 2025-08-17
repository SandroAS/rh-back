import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateJobPositions1755444554066 implements MigrationInterface {
    name = 'CreateJobPositions1755444554066'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_ad150e1e829fc0c9013267f3e4\` ON \`companies\``);
        await queryRunner.query(`DROP INDEX \`IDX_1b05689f6b6456680d538c3d2e\` ON \`users\``);
        await queryRunner.query(`CREATE TABLE \`job_positions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(255) NOT NULL, \`account_id\` int NULL, \`job_title\` varchar(255) NOT NULL, \`description\` text NULL, \`cbo_code\` varchar(255) NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, UNIQUE INDEX \`IDX_84e582e7e7d0932698536a0181\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`job_position_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`job_positions\` ADD CONSTRAINT \`FK_f5d0c9a7ac4302c5f53bf1a0484\` FOREIGN KEY (\`account_id\`) REFERENCES \`accounts\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_c2a71260f7ed0421b49d2b65296\` FOREIGN KEY (\`job_position_id\`) REFERENCES \`job_positions\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_c2a71260f7ed0421b49d2b65296\``);
        await queryRunner.query(`ALTER TABLE \`job_positions\` DROP FOREIGN KEY \`FK_f5d0c9a7ac4302c5f53bf1a0484\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`job_position_id\``);
        await queryRunner.query(`DROP INDEX \`IDX_84e582e7e7d0932698536a0181\` ON \`job_positions\``);
        await queryRunner.query(`DROP TABLE \`job_positions\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_1b05689f6b6456680d538c3d2e\` ON \`users\` (\`address_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_ad150e1e829fc0c9013267f3e4\` ON \`companies\` (\`address_id\`)`);
    }

}
