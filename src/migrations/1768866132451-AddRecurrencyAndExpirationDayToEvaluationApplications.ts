import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRecurrencyAndExpirationDayToEvaluationApplications1768866132451 implements MigrationInterface {
    name = 'AddRecurrencyAndExpirationDayToEvaluationApplications1768866132451'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`evaluation_applications\` ADD \`recurrence\` enum ('MONTHLY', 'BIMONTHLY', 'TRIMESTRIAL', 'SEMESTRIAL', 'ANNUAL') NULL`);
        await queryRunner.query(`ALTER TABLE \`evaluation_applications\` ADD \`expiration_days\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`evaluation_applications\` CHANGE \`expiration_date\` \`expiration_date\` timestamp NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`evaluation_applications\` CHANGE \`expiration_date\` \`expiration_date\` timestamp NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`evaluation_applications\` DROP COLUMN \`expiration_days\``);
        await queryRunner.query(`ALTER TABLE \`evaluation_applications\` DROP COLUMN \`recurrence\``);
    }

}
