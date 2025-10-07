import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDRD1759859327429 implements MigrationInterface {
    name = 'CreateDRD1759859327429'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`drds\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(255) NOT NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`account_id\` int NOT NULL, \`created_by_user_id\` int NOT NULL, \`job_position_id\` int NOT NULL, \`rate\` int UNSIGNED NOT NULL DEFAULT '0', UNIQUE INDEX \`IDX_50f67d6638b2316ea22aee328f\` (\`uuid\`), UNIQUE INDEX \`REL_537c6ecd13f338428a3801f816\` (\`job_position_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`drds\` ADD CONSTRAINT \`FK_06df6a3056ad6fc8c9dd6ddda41\` FOREIGN KEY (\`account_id\`) REFERENCES \`accounts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`drds\` ADD CONSTRAINT \`FK_9592d74d2109602aba02eceb94e\` FOREIGN KEY (\`created_by_user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`drds\` ADD CONSTRAINT \`FK_537c6ecd13f338428a3801f8165\` FOREIGN KEY (\`job_position_id\`) REFERENCES \`job_positions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`drds\` DROP FOREIGN KEY \`FK_537c6ecd13f338428a3801f8165\``);
        await queryRunner.query(`ALTER TABLE \`drds\` DROP FOREIGN KEY \`FK_9592d74d2109602aba02eceb94e\``);
        await queryRunner.query(`ALTER TABLE \`drds\` DROP FOREIGN KEY \`FK_06df6a3056ad6fc8c9dd6ddda41\``);
        await queryRunner.query(`DROP INDEX \`REL_537c6ecd13f338428a3801f816\` ON \`drds\``);
        await queryRunner.query(`DROP INDEX \`IDX_50f67d6638b2316ea22aee328f\` ON \`drds\``);
        await queryRunner.query(`DROP TABLE \`drds\``);
    }

}
