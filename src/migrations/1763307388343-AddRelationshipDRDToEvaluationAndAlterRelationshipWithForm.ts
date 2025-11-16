import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRelationshipDRDToEvaluationAndAlterRelationshipWithForm1763307388343 implements MigrationInterface {
    name = 'AddRelationshipDRDToEvaluationAndAlterRelationshipWithForm1763307388343'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`evaluations\` DROP FOREIGN KEY \`FK_20f588baee928d3d29b63a2410c\``);
        await queryRunner.query(`ALTER TABLE \`evaluations\` ADD UNIQUE INDEX \`IDX_20f588baee928d3d29b63a2410\` (\`form_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_20f588baee928d3d29b63a2410\` ON \`evaluations\` (\`form_id\`)`);
        await queryRunner.query(`ALTER TABLE \`evaluations\` ADD CONSTRAINT \`FK_20f588baee928d3d29b63a2410c\` FOREIGN KEY (\`form_id\`) REFERENCES \`forms\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`evaluations\` ADD CONSTRAINT \`FK_1b775cf57ffa1cce6be6afc3a6d\` FOREIGN KEY (\`drd_id\`) REFERENCES \`drds\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`evaluations\` ADD CONSTRAINT \`FK_ae4ae68e0629fdf63c7de226f31\` FOREIGN KEY (\`created_by_user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`evaluations\` DROP FOREIGN KEY \`FK_ae4ae68e0629fdf63c7de226f31\``);
        await queryRunner.query(`ALTER TABLE \`evaluations\` DROP FOREIGN KEY \`FK_1b775cf57ffa1cce6be6afc3a6d\``);
        await queryRunner.query(`ALTER TABLE \`evaluations\` DROP FOREIGN KEY \`FK_20f588baee928d3d29b63a2410c\``);
        await queryRunner.query(`DROP INDEX \`REL_20f588baee928d3d29b63a2410\` ON \`evaluations\``);
        await queryRunner.query(`ALTER TABLE \`evaluations\` DROP INDEX \`IDX_20f588baee928d3d29b63a2410\``);
        await queryRunner.query(`ALTER TABLE \`evaluations\` ADD CONSTRAINT \`FK_20f588baee928d3d29b63a2410c\` FOREIGN KEY (\`form_id\`) REFERENCES \`forms\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

}
