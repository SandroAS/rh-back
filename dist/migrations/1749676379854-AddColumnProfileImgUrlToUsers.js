"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnProfileImgUrlToUsers1749676379854 = void 0;
class AddColumnProfileImgUrlToUsers1749676379854 {
    constructor() {
        this.name = 'AddColumnProfileImgUrlToUsers1749676379854';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`profile_image_url\` varchar(255) NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`profile_image_url\``);
    }
}
exports.AddColumnProfileImgUrlToUsers1749676379854 = AddColumnProfileImgUrlToUsers1749676379854;
//# sourceMappingURL=1749676379854-AddColumnProfileImgUrlToUsers.js.map