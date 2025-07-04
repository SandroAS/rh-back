"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnGoogleIdToUser1749656291578 = void 0;
class AddColumnGoogleIdToUser1749656291578 {
    constructor() {
        this.name = 'AddColumnGoogleIdToUser1749656291578';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`google_id\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD UNIQUE INDEX \`IDX_0bd5012aeb82628e07f6a1be53\` (\`google_id\`)`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`password\` \`password\` varchar(255) NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`password\` \`password\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP INDEX \`IDX_0bd5012aeb82628e07f6a1be53\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`google_id\``);
    }
}
exports.AddColumnGoogleIdToUser1749656291578 = AddColumnGoogleIdToUser1749656291578;
//# sourceMappingURL=1749656291578-AddColumnGoogleIdToUser.js.map