"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddDefaultZeroToPlansBasePrice1749303950300 = void 0;
class AddDefaultZeroToPlansBasePrice1749303950300 {
    constructor() {
        this.name = 'AddDefaultZeroToPlansBasePrice1749303950300';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`plans\` CHANGE \`base_price\` \`base_price\` decimal(10,2) NOT NULL DEFAULT '0.00'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`plans\` CHANGE \`base_price\` \`base_price\` decimal(10,2) NOT NULL`);
    }
}
exports.AddDefaultZeroToPlansBasePrice1749303950300 = AddDefaultZeroToPlansBasePrice1749303950300;
//# sourceMappingURL=1749303950300-AddDefaultZeroToPlansBasePrice.js.map