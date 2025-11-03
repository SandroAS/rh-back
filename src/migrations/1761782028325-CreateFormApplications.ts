import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFormApplications1761782028325 implements MigrationInterface {
    name = 'CreateFormApplications1761782028325'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`form_applications\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(255) NOT NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`base_form_id\` int NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` text NULL, UNIQUE INDEX \`IDX_e3e556f39044c159b73608d202\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`form_applications\` ADD CONSTRAINT \`FK_450cba6753ad15600a34598ce27\` FOREIGN KEY (\`base_form_id\`) REFERENCES \`forms\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`form_applications\` DROP FOREIGN KEY \`FK_450cba6753ad15600a34598ce27\``);
        await queryRunner.query(`DROP INDEX \`IDX_e3e556f39044c159b73608d202\` ON \`form_applications\``);
        await queryRunner.query(`DROP TABLE \`form_applications\``);
    }

}
