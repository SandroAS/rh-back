import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveUniqueFromTeamName1759431402360 implements MigrationInterface {
    name = 'RemoveUniqueFromTeamName1759431402360'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_48c0c32e6247a2de155baeaf98\` ON \`teams\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_fce5a80c8d37619fa6295222e7\` ON \`teams\` (\`name\`, \`account_id\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_fce5a80c8d37619fa6295222e7\` ON \`teams\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_48c0c32e6247a2de155baeaf98\` ON \`teams\` (\`name\`)`);
    }

}
