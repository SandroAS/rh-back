import { MigrationInterface, QueryRunner } from "typeorm";

export class FixFormAnswerMultiOptions1766695200376 implements MigrationInterface {
    name = 'FixFormAnswerMultiOptions1766695200376'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // 1. Remover as Foreign Keys primeiro (pelo nome da restrição, não pelo índice)
        // Usamos DROP FOREIGN KEY. Se falhar porque não existe, o bloco tentará continuar.
        try {
            await queryRunner.query(`ALTER TABLE \`form_answer_multi_options\` DROP FOREIGN KEY \`FK_531b96e7ddd9fdcbb31fecce9de\``);
        } catch (e) { console.log('FK 531 not found, skipping...'); }
        
        try {
            await queryRunner.query(`ALTER TABLE \`form_answer_multi_options\` DROP FOREIGN KEY \`FK_735c77f349f8752c38e1f0c23d3\``);
        } catch (e) { console.log('FK 735 not found, skipping...'); }

        // 2. Limpar índices órfãos se existirem (evita o erro que você recebeu)
        try {
            await queryRunner.query(`DROP INDEX \`FK_531b96e7ddd9fdcbb31fecce9de\` ON \`form_answer_multi_options\``);
        } catch (e) { /* ignore */ }
        
        try {
            await queryRunner.query(`DROP INDEX \`FK_735c77f349f8752c38e1f0c23d3\` ON \`form_answer_multi_options\``);
        } catch (e) { /* ignore */ }

        // 3. Remover a Primary Key Composta antiga
        try {
            await queryRunner.query(`ALTER TABLE \`form_answer_multi_options\` DROP PRIMARY KEY`);
        } catch (e) { /* ignore if no PK */ }

        // 4. Adicionar a nova estrutura (ID + UUID + Timestamps) em um comando só para evitar conflitos de AUTO_INCREMENT
        await queryRunner.query(`ALTER TABLE \`form_answer_multi_options\` 
            ADD \`id\` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
            ADD \`uuid\` varchar(255) NOT NULL,
            ADD \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            ADD \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`);

        // 5. Adicionar o índice único do UUID
        await queryRunner.query(`ALTER TABLE \`form_answer_multi_options\` ADD UNIQUE INDEX \`IDX_564af1d4b9b96a53884c00adfe\` (\`uuid\`)`);

        // 6. Recriar as FKs apontando corretamente para os campos
        await queryRunner.query(`ALTER TABLE \`form_answer_multi_options\` ADD CONSTRAINT \`FK_735c77f349f8752c38e1f0c23d3\` FOREIGN KEY (\`answer_id\`) REFERENCES \`form_answers\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`form_answer_multi_options\` ADD CONSTRAINT \`FK_531b96e7ddd9fdcbb31fecce9de\` FOREIGN KEY (\`application_option_id\`) REFERENCES \`form_application_question_options\`(\`id\`) ON DELETE RESTRICT ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`form_answer_multi_options\` DROP FOREIGN KEY \`FK_531b96e7ddd9fdcbb31fecce9de\``);
        await queryRunner.query(`ALTER TABLE \`form_answer_multi_options\` DROP FOREIGN KEY \`FK_735c77f349f8752c38e1f0c23d3\``);
        await queryRunner.query(`ALTER TABLE \`form_answer_multi_options\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`form_answer_multi_options\` DROP COLUMN \`uuid\``);
        await queryRunner.query(`ALTER TABLE \`form_answer_multi_options\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`form_answer_multi_options\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`form_answer_multi_options\` ADD PRIMARY KEY (\`answer_id\`, \`application_option_id\`)`);
    }
}
