import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFormResponse1761783900668 implements MigrationInterface {
    name = 'CreateFormResponse1761783900668'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`form_responses\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(255) NOT NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`form_application_id\` int NOT NULL, \`evaluation_application_id\` int NULL, \`user_id\` int NULL, \`is_completed\` tinyint NOT NULL DEFAULT 0, \`submitted_at\` timestamp NULL, UNIQUE INDEX \`IDX_03147ea43e86f0ece9db91ead9\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`form_responses\` ADD CONSTRAINT \`FK_8d239b530940a988149a3bced4e\` FOREIGN KEY (\`form_application_id\`) REFERENCES \`form_applications\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`form_responses\` ADD CONSTRAINT \`FK_f934bd783c03c23b78925bdb6d1\` FOREIGN KEY (\`evaluation_application_id\`) REFERENCES \`evaluation_applications\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`form_responses\` DROP FOREIGN KEY \`FK_f934bd783c03c23b78925bdb6d1\``);
        await queryRunner.query(`ALTER TABLE \`form_responses\` DROP FOREIGN KEY \`FK_8d239b530940a988149a3bced4e\``);
        await queryRunner.query(`DROP INDEX \`IDX_03147ea43e86f0ece9db91ead9\` ON \`form_responses\``);
        await queryRunner.query(`DROP TABLE \`form_responses\``);
    }

}
