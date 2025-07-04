"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddRelationshipUsersToCompanies1750090995589 = void 0;
class AddRelationshipUsersToCompanies1750090995589 {
    constructor() {
        this.name = 'AddRelationshipUsersToCompanies1750090995589';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`companies\` ADD CONSTRAINT \`FK_ee0839cba07cb0c52602021ad4b\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`companies\` DROP FOREIGN KEY \`FK_ee0839cba07cb0c52602021ad4b\``);
    }
}
exports.AddRelationshipUsersToCompanies1750090995589 = AddRelationshipUsersToCompanies1750090995589;
//# sourceMappingURL=1750090995589-AddRelationshipUsersToCompanies.js.map