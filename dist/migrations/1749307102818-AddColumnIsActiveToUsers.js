"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnIsActiveToUsers1749307102818 = void 0;
class AddColumnIsActiveToUsers1749307102818 {
    constructor() {
        this.name = 'AddColumnIsActiveToUsers1749307102818';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`is_active\` tinyint NOT NULL DEFAULT 1`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`is_active\``);
    }
}
exports.AddColumnIsActiveToUsers1749307102818 = AddColumnIsActiveToUsers1749307102818;
//# sourceMappingURL=1749307102818-AddColumnIsActiveToUsers.js.map