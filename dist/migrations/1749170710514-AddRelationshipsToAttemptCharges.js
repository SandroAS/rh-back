"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddRelationshipsToAttemptCharges1749170710514 = void 0;
class AddRelationshipsToAttemptCharges1749170710514 {
    constructor() {
        this.name = 'AddRelationshipsToAttemptCharges1749170710514';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`payment_intentions\` ADD \`total_attempts\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`attempt_charges\` ADD CONSTRAINT \`FK_93c0d0e8b4a4fd3b0231f76aa6f\` FOREIGN KEY (\`payment_intention_id\`) REFERENCES \`payment_intentions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`attempt_charges\` DROP FOREIGN KEY \`FK_93c0d0e8b4a4fd3b0231f76aa6f\``);
        await queryRunner.query(`ALTER TABLE \`payment_intentions\` DROP COLUMN \`total_attempts\``);
    }
}
exports.AddRelationshipsToAttemptCharges1749170710514 = AddRelationshipsToAttemptCharges1749170710514;
//# sourceMappingURL=1749170710514-AddRelationshipsToAttemptCharges.js.map