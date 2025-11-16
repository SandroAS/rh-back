import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveCascadeInsertUpdateFromForms1763326918540 implements MigrationInterface {
    name = 'RemoveCascadeInsertUpdateFromForms1763326918540'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_20f588baee928d3d29b63a2410\` ON \`evaluations\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_20f588baee928d3d29b63a2410\` ON \`evaluations\` (\`form_id\`)`);
    }

}
