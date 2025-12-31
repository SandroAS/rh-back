import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateNotifications1767222980789 implements MigrationInterface {
    name = 'CreateNotifications1767222980789'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`notifications\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(255) NOT NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`account_id\` int NOT NULL, \`user_id\` int NOT NULL, \`template_key\` varchar(100) NOT NULL, \`category\` varchar(20) NOT NULL DEFAULT 'INFO', \`sent_for_system_at\` timestamp NULL, \`sent_for_email_at\` timestamp NULL, \`sent_for_wpp_at\` timestamp NULL, \`viewed_at\` timestamp NULL, \`is_hidden\` tinyint NOT NULL DEFAULT 0, \`redirect_url\` varchar(255) NULL, \`evaluation_application_id\` int NULL, INDEX \`IDX_a1ec3b4b4f2017665b534e6025\` (\`account_id\`), INDEX \`IDX_9a8a82462cab47c73d25f49261\` (\`user_id\`), UNIQUE INDEX \`IDX_84989adc90ebf9f1c9b7ba66f0\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`notifications\` ADD CONSTRAINT \`FK_9a8a82462cab47c73d25f49261f\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`notifications\` ADD CONSTRAINT \`FK_7914a5c9da30795dd088bf3bfdd\` FOREIGN KEY (\`evaluation_application_id\`) REFERENCES \`evaluation_applications\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notifications\` DROP FOREIGN KEY \`FK_7914a5c9da30795dd088bf3bfdd\``);
        await queryRunner.query(`ALTER TABLE \`notifications\` DROP FOREIGN KEY \`FK_9a8a82462cab47c73d25f49261f\``);
        await queryRunner.query(`DROP INDEX \`IDX_84989adc90ebf9f1c9b7ba66f0\` ON \`notifications\``);
        await queryRunner.query(`DROP INDEX \`IDX_9a8a82462cab47c73d25f49261\` ON \`notifications\``);
        await queryRunner.query(`DROP INDEX \`IDX_a1ec3b4b4f2017665b534e6025\` ON \`notifications\``);
        await queryRunner.query(`DROP TABLE \`notifications\``);
    }

}
