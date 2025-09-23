import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTeams1758670799468 implements MigrationInterface {
    name = 'CreateTeams1758670799468'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`team_members\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(255) NOT NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`account_id\` int NOT NULL, \`team_id\` int NOT NULL, \`user_id\` int NOT NULL, UNIQUE INDEX \`IDX_46e9305a61d8ef1c08668ca606\` (\`uuid\`), PRIMARY KEY (\`id\`, \`team_id\`, \`user_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`teams\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(255) NOT NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`account_id\` int NOT NULL, \`created_by_user_id\` int NOT NULL, \`lead_user_id\` int NOT NULL, \`name\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_59dcc55c0af733a59470895cce\` (\`uuid\`), UNIQUE INDEX \`IDX_48c0c32e6247a2de155baeaf98\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`team_members\` ADD CONSTRAINT \`FK_c2d2b65f142ec7e11625d207e48\` FOREIGN KEY (\`account_id\`) REFERENCES \`accounts\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`team_members\` ADD CONSTRAINT \`FK_fdad7d5768277e60c40e01cdcea\` FOREIGN KEY (\`team_id\`) REFERENCES \`teams\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`team_members\` ADD CONSTRAINT \`FK_c2bf4967c8c2a6b845dadfbf3d4\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`teams\` ADD CONSTRAINT \`FK_9dc2f0140a747841db643785a15\` FOREIGN KEY (\`account_id\`) REFERENCES \`accounts\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`teams\` ADD CONSTRAINT \`FK_25a755b4e381ecc1fc4ad45603b\` FOREIGN KEY (\`created_by_user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`teams\` ADD CONSTRAINT \`FK_180c5cec740710dcf23f5e119b6\` FOREIGN KEY (\`lead_user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`teams\` DROP FOREIGN KEY \`FK_180c5cec740710dcf23f5e119b6\``);
        await queryRunner.query(`ALTER TABLE \`teams\` DROP FOREIGN KEY \`FK_25a755b4e381ecc1fc4ad45603b\``);
        await queryRunner.query(`ALTER TABLE \`teams\` DROP FOREIGN KEY \`FK_9dc2f0140a747841db643785a15\``);
        await queryRunner.query(`ALTER TABLE \`team_members\` DROP FOREIGN KEY \`FK_c2bf4967c8c2a6b845dadfbf3d4\``);
        await queryRunner.query(`ALTER TABLE \`team_members\` DROP FOREIGN KEY \`FK_fdad7d5768277e60c40e01cdcea\``);
        await queryRunner.query(`ALTER TABLE \`team_members\` DROP FOREIGN KEY \`FK_c2d2b65f142ec7e11625d207e48\``);
        await queryRunner.query(`DROP INDEX \`IDX_48c0c32e6247a2de155baeaf98\` ON \`teams\``);
        await queryRunner.query(`DROP INDEX \`IDX_59dcc55c0af733a59470895cce\` ON \`teams\``);
        await queryRunner.query(`DROP TABLE \`teams\``);
        await queryRunner.query(`DROP INDEX \`IDX_46e9305a61d8ef1c08668ca606\` ON \`team_members\``);
        await queryRunner.query(`DROP TABLE \`team_members\``);
    }

}
