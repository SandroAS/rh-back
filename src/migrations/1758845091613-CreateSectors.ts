import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSectors1758845091613 implements MigrationInterface {
    name = 'CreateSectors1758845091613'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`sectors\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(255) NOT NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`account_id\` int NOT NULL, \`created_by_user_id\` int NULL, \`name\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_6bf3d7decfec7b8c554b92ee15\` (\`uuid\`), UNIQUE INDEX \`IDX_1a10b192342e5165948f4dccef\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sector_has_users\` (\`sector_id\` int NOT NULL, \`user_id\` int NOT NULL, INDEX \`IDX_f19979c626dbec71227e6a085f\` (\`sector_id\`), INDEX \`IDX_593902e2f1ea64516e63ac573b\` (\`user_id\`), PRIMARY KEY (\`sector_id\`, \`user_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`teams\` ADD \`sector_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`sectors\` ADD CONSTRAINT \`FK_3ba3b1e869863ee49ba53648bb4\` FOREIGN KEY (\`account_id\`) REFERENCES \`accounts\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sectors\` ADD CONSTRAINT \`FK_24dede2ae315714c6ff7c9b3ee1\` FOREIGN KEY (\`created_by_user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`teams\` ADD CONSTRAINT \`FK_294a3a7e6d5e8a32c5fb0d7d75e\` FOREIGN KEY (\`sector_id\`) REFERENCES \`sectors\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sector_has_users\` ADD CONSTRAINT \`FK_f19979c626dbec71227e6a085f8\` FOREIGN KEY (\`sector_id\`) REFERENCES \`sectors\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`sector_has_users\` ADD CONSTRAINT \`FK_593902e2f1ea64516e63ac573bb\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sector_has_users\` DROP FOREIGN KEY \`FK_593902e2f1ea64516e63ac573bb\``);
        await queryRunner.query(`ALTER TABLE \`sector_has_users\` DROP FOREIGN KEY \`FK_f19979c626dbec71227e6a085f8\``);
        await queryRunner.query(`ALTER TABLE \`teams\` DROP FOREIGN KEY \`FK_294a3a7e6d5e8a32c5fb0d7d75e\``);
        await queryRunner.query(`ALTER TABLE \`sectors\` DROP FOREIGN KEY \`FK_24dede2ae315714c6ff7c9b3ee1\``);
        await queryRunner.query(`ALTER TABLE \`sectors\` DROP FOREIGN KEY \`FK_3ba3b1e869863ee49ba53648bb4\``);
        await queryRunner.query(`ALTER TABLE \`teams\` DROP COLUMN \`sector_id\``);
        await queryRunner.query(`DROP INDEX \`IDX_593902e2f1ea64516e63ac573b\` ON \`sector_has_users\``);
        await queryRunner.query(`DROP INDEX \`IDX_f19979c626dbec71227e6a085f\` ON \`sector_has_users\``);
        await queryRunner.query(`DROP TABLE \`sector_has_users\``);
        await queryRunner.query(`DROP INDEX \`IDX_1a10b192342e5165948f4dccef\` ON \`sectors\``);
        await queryRunner.query(`DROP INDEX \`IDX_6bf3d7decfec7b8c554b92ee15\` ON \`sectors\``);
        await queryRunner.query(`DROP TABLE \`sectors\``);
    }

}
