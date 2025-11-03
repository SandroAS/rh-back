import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEvaluationApplications1761783737070 implements MigrationInterface {
    name = 'CreateEvaluationApplications1761783737070'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`evaluation_applications\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(255) NOT NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`evaluation_id\` int NOT NULL, \`form_application_id\` int NOT NULL, \`type\` enum ('SELF', 'PEER', 'LEADER', 'SUBORDINATE', 'CLIENT', 'OTHER') NOT NULL, \`started_date\` timestamp NOT NULL, \`expiration_date\` timestamp NOT NULL, \`evaluated_user_id\` int NOT NULL, \`submitting_user_id\` int NOT NULL, UNIQUE INDEX \`IDX_fef4ce0df57cb4019b62056425\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`evaluation_applications\` ADD CONSTRAINT \`FK_8a9aa83ca0401f93cd5726dd3ab\` FOREIGN KEY (\`evaluation_id\`) REFERENCES \`evaluations\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`evaluation_applications\` ADD CONSTRAINT \`FK_82147ca1de6e2d39e94fec5d3a4\` FOREIGN KEY (\`form_application_id\`) REFERENCES \`form_applications\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`evaluation_applications\` DROP FOREIGN KEY \`FK_82147ca1de6e2d39e94fec5d3a4\``);
        await queryRunner.query(`ALTER TABLE \`evaluation_applications\` DROP FOREIGN KEY \`FK_8a9aa83ca0401f93cd5726dd3ab\``);
        await queryRunner.query(`DROP INDEX \`IDX_fef4ce0df57cb4019b62056425\` ON \`evaluation_applications\``);
        await queryRunner.query(`DROP TABLE \`evaluation_applications\``);
    }

}
