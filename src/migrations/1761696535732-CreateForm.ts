import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateForm1761696535732 implements MigrationInterface {
    name = 'CreateForm1761696535732'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`forms\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(255) NOT NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`name\` varchar(255) NOT NULL, \`description\` text NULL, \`status\` enum ('DRAFT', 'PUBLISHED', 'ARCHIVED') NOT NULL DEFAULT 'DRAFT', UNIQUE INDEX \`IDX_97b9b45e5d14cd3682dccf3350\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_97b9b45e5d14cd3682dccf3350\` ON \`forms\``);
        await queryRunner.query(`DROP TABLE \`forms\``);
    }

}
