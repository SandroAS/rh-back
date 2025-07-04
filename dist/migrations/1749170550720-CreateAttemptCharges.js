"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAttemptCharges1749170550720 = void 0;
class CreateAttemptCharges1749170550720 {
    constructor() {
        this.name = 'CreateAttemptCharges1749170550720';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`attempt_charges\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(255) NOT NULL, \`payment_intention_id\` int NOT NULL, \`status\` varchar(255) NOT NULL, \`amount\` decimal NOT NULL, \`method\` varchar(255) NOT NULL, \`gateway\` enum ('PAGARME') NOT NULL, \`attempt_number\` int NOT NULL, \`attempt_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, UNIQUE INDEX \`IDX_5bed38a865651f21761dba7d38\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX \`IDX_5bed38a865651f21761dba7d38\` ON \`attempt_charges\``);
        await queryRunner.query(`DROP TABLE \`attempt_charges\``);
    }
}
exports.CreateAttemptCharges1749170550720 = CreateAttemptCharges1749170550720;
//# sourceMappingURL=1749170550720-CreateAttemptCharges.js.map