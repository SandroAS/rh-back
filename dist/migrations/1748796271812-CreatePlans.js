"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePlans1748796271812 = void 0;
class CreatePlans1748796271812 {
    constructor() {
        this.name = 'CreatePlans1748796271812';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`plans\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`price\` decimal(10,2) NOT NULL, \`interval\` enum ('monthly', 'yearly') NOT NULL, \`user_limit\` int NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, UNIQUE INDEX \`IDX_90304db6cb3a8d7d17601328b2\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX \`IDX_90304db6cb3a8d7d17601328b2\` ON \`plans\``);
        await queryRunner.query(`DROP TABLE \`plans\``);
    }
}
exports.CreatePlans1748796271812 = CreatePlans1748796271812;
//# sourceMappingURL=1748796271812-CreatePlans.js.map