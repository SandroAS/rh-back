"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterUserAccountIdToNullable1749568828160 = void 0;
class AlterUserAccountIdToNullable1749568828160 {
    constructor() {
        this.name = 'AlterUserAccountIdToNullable1749568828160';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_17a709b8b6146c491e6615c29d7\``);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`account_id\` \`account_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_17a709b8b6146c491e6615c29d7\` FOREIGN KEY (\`account_id\`) REFERENCES \`accounts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_17a709b8b6146c491e6615c29d7\``);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`account_id\` \`account_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_17a709b8b6146c491e6615c29d7\` FOREIGN KEY (\`account_id\`) REFERENCES \`accounts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
exports.AlterUserAccountIdToNullable1749568828160 = AlterUserAccountIdToNullable1749568828160;
//# sourceMappingURL=1749568828160-AlterUserAccountIdToNullable.js.map