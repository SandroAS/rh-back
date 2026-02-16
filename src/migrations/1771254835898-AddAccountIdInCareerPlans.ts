import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAccountIdInCareerPlans1771254835898 implements MigrationInterface {
    name = 'AddAccountIdInCareerPlans1771254835898'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`career_plans\` ADD \`account_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`career_plans\` ADD CONSTRAINT \`FK_59b6e9a00c143831f85ae63a5cf\` FOREIGN KEY (\`account_id\`) REFERENCES \`accounts\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`career_plans\` DROP FOREIGN KEY \`FK_59b6e9a00c143831f85ae63a5cf\``);
        await queryRunner.query(`ALTER TABLE \`career_plans\` DROP COLUMN \`account_id\``);
    }

}
