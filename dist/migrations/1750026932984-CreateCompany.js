"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCompany1750026932984 = void 0;
class CreateCompany1750026932984 {
    constructor() {
        this.name = 'CreateCompany1750026932984';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`companies\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(255) NOT NULL, \`user_id\` int NOT NULL, \`name\` varchar(255) NULL, \`social_reason\` varchar(255) NULL, \`cnpj\` varchar(255) NULL, \`cellphone\` varchar(255) NULL, \`email\` varchar(255) NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, UNIQUE INDEX \`IDX_535ddf773996ede3697d07ef71\` (\`uuid\`), UNIQUE INDEX \`IDX_703760d095b8e399e34950f496\` (\`cnpj\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX \`IDX_703760d095b8e399e34950f496\` ON \`companies\``);
        await queryRunner.query(`DROP INDEX \`IDX_535ddf773996ede3697d07ef71\` ON \`companies\``);
        await queryRunner.query(`DROP TABLE \`companies\``);
    }
}
exports.CreateCompany1750026932984 = CreateCompany1750026932984;
//# sourceMappingURL=1750026932984-CreateCompany.js.map