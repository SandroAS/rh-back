"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runSeeders = runSeeders;
const seed_permissions_roles_1 = require("./seed-permissions-roles");
const seed_plans_1 = require("./seed-plans");
const seed_system_modules_1 = require("./seed-system-modules");
async function runSeeders() {
    console.log('Running seeders...');
    await (0, seed_permissions_roles_1.seedPermissionsRoles)();
    await (0, seed_plans_1.seedPlans)();
    await (0, seed_system_modules_1.seedSystemModules)();
    console.log('Seeders finished.');
}
//# sourceMappingURL=run-seeders.js.map