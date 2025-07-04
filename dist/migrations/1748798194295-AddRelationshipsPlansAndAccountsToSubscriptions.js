"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddRelationshipsAccountsToSubscriptions1748798194295 = void 0;
class AddRelationshipsAccountsToSubscriptions1748798194295 {
    constructor() {
        this.name = 'AddRelationshipsAccountsToSubscriptions1748798194295';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`accounts\` ADD UNIQUE INDEX \`IDX_7e32a3b38f3fec3adf342b5b42\` (\`current_subscription_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_7e32a3b38f3fec3adf342b5b42\` ON \`accounts\` (\`current_subscription_id\`)`);
        await queryRunner.query(`ALTER TABLE \`subscriptions\` ADD CONSTRAINT \`FK_7c7bc85becc85aec89c103784e6\` FOREIGN KEY (\`account_id\`) REFERENCES \`accounts\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`accounts\` ADD CONSTRAINT \`FK_7e32a3b38f3fec3adf342b5b428\` FOREIGN KEY (\`current_subscription_id\`) REFERENCES \`subscriptions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`accounts\` DROP FOREIGN KEY \`FK_7e32a3b38f3fec3adf342b5b428\``);
        await queryRunner.query(`ALTER TABLE \`subscriptions\` DROP FOREIGN KEY \`FK_7c7bc85becc85aec89c103784e6\``);
        await queryRunner.query(`DROP INDEX \`REL_7e32a3b38f3fec3adf342b5b42\` ON \`accounts\``);
        await queryRunner.query(`ALTER TABLE \`accounts\` DROP INDEX \`IDX_7e32a3b38f3fec3adf342b5b42\``);
    }
}
exports.AddRelationshipsAccountsToSubscriptions1748798194295 = AddRelationshipsAccountsToSubscriptions1748798194295;
//# sourceMappingURL=1748798194295-AddRelationshipsPlansAndAccountsToSubscriptions.js.map