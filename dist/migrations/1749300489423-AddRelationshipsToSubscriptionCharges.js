"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddRelationshipsToSubscriptionCharges1749300489423 = void 0;
class AddRelationshipsToSubscriptionCharges1749300489423 {
    constructor() {
        this.name = 'AddRelationshipsToSubscriptionCharges1749300489423';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`subscription_charges\` ADD CONSTRAINT \`FK_c949b50558b897d6aa8085cb0c3\` FOREIGN KEY (\`subscription_id\`) REFERENCES \`subscriptions\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`subscription_charges\` DROP FOREIGN KEY \`FK_c949b50558b897d6aa8085cb0c3\``);
    }
}
exports.AddRelationshipsToSubscriptionCharges1749300489423 = AddRelationshipsToSubscriptionCharges1749300489423;
//# sourceMappingURL=1749300489423-AddRelationshipsToSubscriptionCharges.js.map