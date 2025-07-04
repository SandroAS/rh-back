"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnPricePerProfessionalToPlans1748807122359 = void 0;
class AddColumnPricePerProfessionalToPlans1748807122359 {
    constructor() {
        this.name = 'AddColumnPricePerProfessionalToPlans1748807122359';
    }
    async up(queryRunner) {
        await queryRunner.query(`DROP INDEX \`IDX_7f9954637355c3a36afffcc45c\` ON \`accounts\``);
        await queryRunner.query(`ALTER TABLE \`plans\` DROP COLUMN \`price\``);
        await queryRunner.query(`ALTER TABLE \`plans\` ADD \`is_dynamic\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`plans\` ADD \`base_price\` decimal(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`plans\` ADD \`price_per_professional\` decimal(10,2) NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`plans\` DROP COLUMN \`price_per_professional\``);
        await queryRunner.query(`ALTER TABLE \`plans\` DROP COLUMN \`base_price\``);
        await queryRunner.query(`ALTER TABLE \`plans\` DROP COLUMN \`is_dynamic\``);
        await queryRunner.query(`ALTER TABLE \`plans\` ADD \`price\` decimal NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_7f9954637355c3a36afffcc45c\` ON \`accounts\` (\`last_trial_id\`)`);
    }
}
exports.AddColumnPricePerProfessionalToPlans1748807122359 = AddColumnPricePerProfessionalToPlans1748807122359;
//# sourceMappingURL=1748807122359-AddColumnPricePerProfessionalToPlans.js.map