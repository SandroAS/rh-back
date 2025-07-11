"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserMetas1749753080016 = void 0;
class CreateUserMetas1749753080016 {
    constructor() {
        this.name = 'CreateUserMetas1749753080016';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`user_metas\` (\`id\` int NOT NULL AUTO_INCREMENT, \`user_id\` int NOT NULL, \`key\` varchar(255) NOT NULL, \`value\` varchar(255) NOT NULL, \`description\` text NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, INDEX \`IDX_801ae427abd969aec6570ae68f\` (\`user_id\`), INDEX \`IDX_1927ef4f51a228075e0e6c3ec3\` (\`user_id\`, \`key\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user_metas\` ADD CONSTRAINT \`FK_801ae427abd969aec6570ae68fa\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`user_metas\` DROP FOREIGN KEY \`FK_801ae427abd969aec6570ae68fa\``);
        await queryRunner.query(`DROP INDEX \`IDX_1927ef4f51a228075e0e6c3ec3\` ON \`user_metas\``);
        await queryRunner.query(`DROP INDEX \`IDX_801ae427abd969aec6570ae68f\` ON \`user_metas\``);
        await queryRunner.query(`DROP TABLE \`user_metas\``);
    }
}
exports.CreateUserMetas1749753080016 = CreateUserMetas1749753080016;
//# sourceMappingURL=1749753080016-CreateUserMetas.js.map