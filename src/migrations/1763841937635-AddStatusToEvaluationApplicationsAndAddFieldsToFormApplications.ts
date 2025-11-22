import { MigrationInterface, QueryRunner } from "typeorm";

const executeQuerySafe = async (queryRunner: QueryRunner, query: string, errorMessage: string) => {
    try {
        await queryRunner.query(query);
    } catch (error) {
        if (error.errno === 1060 || error.errno === 1091) {
            console.log(`[Safe Migration] ${errorMessage}: A coluna já existe ou foi removida. Ignorando.`);
            return;
        }
        throw error;
    }
};

export class AddStatusToEvaluationApplicationsAndAddFieldsToFormApplications1763841937635 implements MigrationInterface {
    name = 'AddStatusToEvaluationApplicationsAndAddFieldsToFormApplications1763841937635'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await executeQuerySafe(
            queryRunner,
            `ALTER TABLE \`form_application_questions\` DROP COLUMN \`text\``,
            "DROP COLUMN 'text' em form_application_questions"
        );
        
        await executeQuerySafe(
            queryRunner,
            `ALTER TABLE \`evaluation_applications\` ADD \`status\` enum ('CREATED', 'SENDED', 'ACCESSED', 'IN_PROGRESS', 'FINISHED', 'CANCELED', 'EXPIRED') NOT NULL DEFAULT 'CREATED'`,
            "ADD COLUMN 'status' em evaluation_applications"
        );

        await executeQuerySafe(
            queryRunner,
            `ALTER TABLE \`form_application_questions\` ADD \`title\` varchar(255) NOT NULL`,
            "ADD COLUMN 'title' em form_application_questions"
        );
        
        await executeQuerySafe(
            queryRunner,
            `ALTER TABLE \`form_application_questions\` ADD \`description\` text NULL`,
            "ADD COLUMN 'description' em form_application_questions"
        );
        
        await executeQuerySafe(
            queryRunner,
            `ALTER TABLE \`form_applications\` ADD \`account_id\` int NOT NULL`,
            "ADD COLUMN 'account_id' em form_applications"
        );
        
        await executeQuerySafe(
            queryRunner,
            `ALTER TABLE \`form_applications\` ADD \`accessed_from\` enum ('EMAIL', 'WHATSAPP', 'SYSTEM') NULL`,
            "ADD COLUMN 'accessed_from' em form_applications"
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`form_applications\` DROP COLUMN \`accessed_from\``);
        await queryRunner.query(`ALTER TABLE \`form_applications\` DROP COLUMN \`account_id\``);
        await queryRunner.query(`ALTER TABLE \`form_application_questions\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`form_application_questions\` DROP COLUMN \`title\``);
        await queryRunner.query(`ALTER TABLE \`evaluation_applications\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`form_application_questions\` ADD \`text\` text NOT NULL`);
    }

}