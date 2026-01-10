import { MigrationInterface, QueryRunner } from "typeorm";

export class FixUniqueNameAndAccountToSectors1768072924581 implements MigrationInterface {
    name = 'FixUniqueNameAndAccountToSectors1768072924581'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_1a10b192342e5165948f4dccef\` ON \`sectors\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_6c43661f9ed5186cd5dbe1ac6e\` ON \`sectors\` (\`name\`, \`account_id\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_6c43661f9ed5186cd5dbe1ac6e\` ON \`sectors\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_1a10b192342e5165948f4dccef\` ON \`sectors\` (\`name\`)`);
    }

}
