import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCareerPlanAndCareerPlanJobPositions1771253423926 implements MigrationInterface {
    name = 'CreateCareerPlanAndCareerPlanJobPositions1771253423926'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`career_plans\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(255) NOT NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`name\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_cb04a66a2783c1ad505f115ec8\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`career_plan_job_positions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(255) NOT NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`career_plan_id\` int NOT NULL, \`job_position_id\` int NOT NULL, \`order\` int NOT NULL DEFAULT '0', \`career_in_ypsilon\` tinyint NOT NULL DEFAULT 0, \`ypsilon_after_order\` int NULL, UNIQUE INDEX \`IDX_e7638429e7539acfa5dc6e639c\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`career_plan_job_positions\` ADD CONSTRAINT \`FK_da056d276b8be31a0c13d654551\` FOREIGN KEY (\`career_plan_id\`) REFERENCES \`career_plans\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`career_plan_job_positions\` ADD CONSTRAINT \`FK_76fa840f6349a8241eb892b6054\` FOREIGN KEY (\`job_position_id\`) REFERENCES \`job_positions\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`career_plan_job_positions\` DROP FOREIGN KEY \`FK_76fa840f6349a8241eb892b6054\``);
        await queryRunner.query(`ALTER TABLE \`career_plan_job_positions\` DROP FOREIGN KEY \`FK_da056d276b8be31a0c13d654551\``);
        await queryRunner.query(`DROP INDEX \`IDX_e7638429e7539acfa5dc6e639c\` ON \`career_plan_job_positions\``);
        await queryRunner.query(`DROP TABLE \`career_plan_job_positions\``);
        await queryRunner.query(`DROP INDEX \`IDX_cb04a66a2783c1ad505f115ec8\` ON \`career_plans\``);
        await queryRunner.query(`DROP TABLE \`career_plans\``);
    }

}
