import { MigrationInterface, QueryRunner } from "typeorm";

export class FixLeaderRelationshipInTeams1759434564563 implements MigrationInterface {
    name = 'FixLeaderRelationshipInTeams1759434564563'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`teams\` DROP FOREIGN KEY \`FK_180c5cec740710dcf23f5e119b6\``);
        await queryRunner.query(`ALTER TABLE \`teams\` CHANGE \`lead_user_id\` \`leader_user_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`teams\` ADD CONSTRAINT \`FK_7b89d4e8a0c772f98a40bfe1fa3\` FOREIGN KEY (\`leader_user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`teams\` DROP FOREIGN KEY \`FK_7b89d4e8a0c772f98a40bfe1fa3\``);
        await queryRunner.query(`ALTER TABLE \`teams\` CHANGE \`leader_user_id\` \`lead_user_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`teams\` ADD CONSTRAINT \`FK_180c5cec740710dcf23f5e119b6\` FOREIGN KEY (\`lead_user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
