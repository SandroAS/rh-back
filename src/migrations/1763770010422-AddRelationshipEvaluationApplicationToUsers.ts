import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRelationshipEvaluationApplicationToUsers1763770010422 implements MigrationInterface {
    name = 'AddRelationshipEvaluationApplicationToUsers1763770010422'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`evaluation_applications\` ADD CONSTRAINT \`FK_438badf0eb2faff1c705e8e7a9e\` FOREIGN KEY (\`evaluated_user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`evaluation_applications\` ADD CONSTRAINT \`FK_92c3b268eae81e817c92c6f787c\` FOREIGN KEY (\`submitting_user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`evaluation_applications\` DROP FOREIGN KEY \`FK_92c3b268eae81e817c92c6f787c\``);
        await queryRunner.query(`ALTER TABLE \`evaluation_applications\` DROP FOREIGN KEY \`FK_438badf0eb2faff1c705e8e7a9e\``);
    }

}
