"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSystemModules1749759193616 = void 0;
class CreateSystemModules1749759193616 {
    constructor() {
        this.name = 'CreateSystemModules1749759193616';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`system_modules\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(255) NOT NULL, \`name\` enum ('EMPLOYEE_MANAGEMENT', 'RECRUITMENT', 'PERFORMANCE_MANAGEMENT', 'CAREER_DEVELOPMENT', 'TRAINING_DEVELOPMENT', 'PAYROLL', 'TIME_ATTENDANCE', 'BENEFITS_COMPENSATION', 'ONBOARDING_OFFBOARDING') NOT NULL, \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_721590d7e5b86a44ace69a189e\` (\`uuid\`), UNIQUE INDEX \`IDX_7efe9f0198a23342871af637de\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`account_has_system_modules\` (\`account_id\` int NOT NULL, \`system_module_id\` int NOT NULL, INDEX \`IDX_729ea303060a0a44c760a82423\` (\`account_id\`), INDEX \`IDX_d653339f65307367a39b3af22b\` (\`system_module_id\`), PRIMARY KEY (\`account_id\`, \`system_module_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`account_has_system_modules\` ADD CONSTRAINT \`FK_729ea303060a0a44c760a824238\` FOREIGN KEY (\`account_id\`) REFERENCES \`accounts\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`account_has_system_modules\` ADD CONSTRAINT \`FK_d653339f65307367a39b3af22b4\` FOREIGN KEY (\`system_module_id\`) REFERENCES \`system_modules\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`account_has_system_modules\` DROP FOREIGN KEY \`FK_d653339f65307367a39b3af22b4\``);
        await queryRunner.query(`ALTER TABLE \`account_has_system_modules\` DROP FOREIGN KEY \`FK_729ea303060a0a44c760a824238\``);
        await queryRunner.query(`DROP INDEX \`IDX_d653339f65307367a39b3af22b\` ON \`account_has_system_modules\``);
        await queryRunner.query(`DROP INDEX \`IDX_729ea303060a0a44c760a82423\` ON \`account_has_system_modules\``);
        await queryRunner.query(`DROP TABLE \`account_has_system_modules\``);
        await queryRunner.query(`DROP INDEX \`IDX_7efe9f0198a23342871af637de\` ON \`system_modules\``);
        await queryRunner.query(`DROP INDEX \`IDX_721590d7e5b86a44ace69a189e\` ON \`system_modules\``);
        await queryRunner.query(`DROP TABLE \`system_modules\``);
    }
}
exports.CreateSystemModules1749759193616 = CreateSystemModules1749759193616;
//# sourceMappingURL=1749759193616-CreateSystemModules.js.map