import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveYAfterOrderAndCareerInYAndAddCareerPlanYId1771267305878 implements MigrationInterface {
    name = 'RemoveYAfterOrderAndCareerInYAndAddCareerPlanYId1771267305878'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`career_plan_job_positions\` DROP COLUMN \`career_in_ypsilon\``);
        await queryRunner.query(`ALTER TABLE \`career_plan_job_positions\` DROP COLUMN \`ypsilon_after_order\``);
        await queryRunner.query(`ALTER TABLE \`career_plan_job_positions\` ADD \`career_plan_y_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`career_plan_job_positions\` ADD CONSTRAINT \`FK_c55cfd9d32cd7864d20050c0e41\` FOREIGN KEY (\`career_plan_y_id\`) REFERENCES \`career_plans\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`career_plan_job_positions\` DROP FOREIGN KEY \`FK_c55cfd9d32cd7864d20050c0e41\``);
        await queryRunner.query(`ALTER TABLE \`career_plan_job_positions\` DROP COLUMN \`career_plan_y_id\``);
        await queryRunner.query(`ALTER TABLE \`career_plan_job_positions\` ADD \`ypsilon_after_order\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`career_plan_job_positions\` ADD \`career_in_ypsilon\` tinyint NOT NULL DEFAULT '0'`);
    }

}
