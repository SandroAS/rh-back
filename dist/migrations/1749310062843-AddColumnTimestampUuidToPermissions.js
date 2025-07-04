"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnTimestampUuidToPermissions1749310062843 = void 0;
class AddColumnTimestampUuidToPermissions1749310062843 {
    constructor() {
        this.name = 'AddColumnTimestampUuidToPermissions1749310062843';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`permissions\` ADD \`uuid\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`permissions\` ADD UNIQUE INDEX \`IDX_82c4b329177eba3db6338f732c\` (\`uuid\`)`);
        await queryRunner.query(`ALTER TABLE \`permissions\` ADD \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`permissions\` ADD \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`permissions\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`permissions\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`permissions\` DROP INDEX \`IDX_82c4b329177eba3db6338f732c\``);
        await queryRunner.query(`ALTER TABLE \`permissions\` DROP COLUMN \`uuid\``);
    }
}
exports.AddColumnTimestampUuidToPermissions1749310062843 = AddColumnTimestampUuidToPermissions1749310062843;
//# sourceMappingURL=1749310062843-AddColumnTimestampUuidToPermissions.js.map