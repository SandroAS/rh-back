import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateNotifications1766695494839 implements MigrationInterface {
    name = 'CreateNotifications1766695494839'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // 1. Criar a tabela com todas as colunas da sua entidade
        await queryRunner.query(`
            CREATE TABLE \`notifications\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`account_id\` int NOT NULL,
                \`user_id\` int NOT NULL,
                \`template_key\` varchar(100) NOT NULL,
                \`category\` varchar(20) NOT NULL DEFAULT 'INFO',
                \`sent_for_system_at\` timestamp NULL,
                \`sent_for_email_at\` timestamp NULL,
                \`sent_for_wpp_at\` timestamp NULL,
                \`viewed_at\` timestamp NULL,
                \`is_hidden\` tinyint NOT NULL DEFAULT 0,
                \`redirect_url\` varchar(255) NULL,
                \`evaluation_application_id\` int NULL,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                INDEX \`IDX_user_id\` (\`user_id\`),
                INDEX \`IDX_account_id\` (\`account_id\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE=InnoDB
        `);

        // 2. Adicionar as Foreign Keys
        await queryRunner.query(`
            ALTER TABLE \`notifications\` 
            ADD CONSTRAINT \`FK_9a8a82462cab47c73d25f49261f\` 
            FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) 
            ON DELETE CASCADE ON UPDATE NO ACTION
        `);

        await queryRunner.query(`
            ALTER TABLE \`notifications\` 
            ADD CONSTRAINT \`FK_7914a5c9da30795dd088bf3bfdd\` 
            FOREIGN KEY (\`evaluation_application_id\`) REFERENCES \`evaluation_applications\`(\`id\`) 
            ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notifications\` DROP FOREIGN KEY \`FK_7914a5c9da30795dd088bf3bfdd\``);
        await queryRunner.query(`ALTER TABLE \`notifications\` DROP FOREIGN KEY \`FK_9a8a82462cab47c73d25f49261f\``);
        await queryRunner.query(`DROP TABLE \`notifications\``);
    }
}
