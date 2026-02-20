import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCareerPlanIdToUsers1771612608725 implements MigrationInterface {
    name = 'AddCareerPlanIdToUsers1771612608725'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`career_plan_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_b0f8dec3149da136fee7b6e1cef\` FOREIGN KEY (\`career_plan_id\`) REFERENCES \`career_plans\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_b0f8dec3149da136fee7b6e1cef\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`career_plan_id\``);
    }

}
