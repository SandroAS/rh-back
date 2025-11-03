import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEvaluations1761783567820 implements MigrationInterface {
    name = 'CreateEvaluations1761783567820'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`evaluations\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(255) NOT NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`form_id\` int NOT NULL, \`drd_id\` int NULL, \`name\` varchar(255) NOT NULL, \`rate\` decimal(5,2) NOT NULL DEFAULT '0.00', \`account_id\` int NOT NULL, \`created_by_user_id\` int NOT NULL, UNIQUE INDEX \`IDX_af22bb9db13043edcaef11a5cf\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`evaluations\` ADD CONSTRAINT \`FK_20f588baee928d3d29b63a2410c\` FOREIGN KEY (\`form_id\`) REFERENCES \`forms\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`evaluations\` DROP FOREIGN KEY \`FK_20f588baee928d3d29b63a2410c\``);
        await queryRunner.query(`DROP INDEX \`IDX_af22bb9db13043edcaef11a5cf\` ON \`evaluations\``);
        await queryRunner.query(`DROP TABLE \`evaluations\``);
    }

}
