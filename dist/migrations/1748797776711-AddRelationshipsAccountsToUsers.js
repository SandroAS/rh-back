"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddRelationshipsAccountsToUsers1748797776711 = void 0;
class AddRelationshipsAccountsToUsers1748797776711 {
    constructor() {
        this.name = 'AddRelationshipsAccountsToUsers1748797776711';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`accounts\` ADD CONSTRAINT \`FK_61992fd53978b85911504fb9127\` FOREIGN KEY (\`admin_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_6acfec7285fdf9f463462de3e9f\` FOREIGN KEY (\`account_id\`) REFERENCES \`accounts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_6acfec7285fdf9f463462de3e9f\``);
        await queryRunner.query(`ALTER TABLE \`accounts\` DROP FOREIGN KEY \`FK_61992fd53978b85911504fb9127\``);
    }
}
exports.AddRelationshipsAccountsToUsers1748797776711 = AddRelationshipsAccountsToUsers1748797776711;
//# sourceMappingURL=1748797776711-AddRelationshipsAccountsToUsers.js.map