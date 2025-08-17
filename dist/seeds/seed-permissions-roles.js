"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedPermissionsRoles = seedPermissionsRoles;
const roles_types_dto_1 = require("../modules/roles/dtos/roles-types.dto");
const data_source_1 = require("../data-source");
const permission_entity_1 = require("../entities/permission.entity");
const role_entity_1 = require("../entities/role.entity");
const allPermissions = [
    'dashboard_read',
    'dashboard_billings_total_read',
    'dashboard_billings_chart_read',
    'subscription_settings_read',
    'subscription_settings_pay',
    'subscriptions_settings_cancel',
    'subscriptions_settings_upgrade',
    'integrations_settings_read',
    'integrations_settings_update',
    'integrations_settings_create',
    'integrations_settings_delete',
    'users_settings_read',
    'users_settings_update',
    'users_settings_deactive',
    'users_settings_create',
    'permissions_settings_read',
    'permissions_settings_create',
    'permissions_settings_update',
    'permissions_settings_delete',
    'job_positions_read',
    'job_positions_create',
    'job_positions_update',
    'job_positions_delete',
    'levels_groups_read',
    'levels_groups_create',
    'levels_groups_update',
    'levels_groups_delete',
    'teams_read',
    'teams_create',
    'teams_update',
    'teams_delete',
    'drd_read',
    'drd_create',
    'drd_update',
    'drd_delete',
    'career_plans_read',
    'career_plans_create',
    'career_plans_update',
    'career_plans_delete',
    'eval_delete',
];
const restrictedByManager = [
    'users_settings_read',
    'users_settings_update',
    'users_settings_create',
    'users_settings_deactive',
    'permissions_settings_read',
    'permissions_settings_create',
    'permissions_settings_update',
    'permissions_settings_delete',
    'subscriptions_settings_cancel',
    'subscriptions_settings_upgrade',
];
const restrictedByProfessional = [
    'users_settings_read',
    'users_settings_update',
    'users_settings_create',
    'users_settings_deactive',
    'permissions_settings_read',
    'permissions_settings_create',
    'permissions_settings_update',
    'permissions_settings_delete',
    'subscriptions_settings_cancel',
    'subscriptions_settings_upgrade',
];
async function seedPermissionsRoles() {
    const permissionRepo = data_source_1.default.getRepository(permission_entity_1.Permission);
    const roleRepo = data_source_1.default.getRepository(role_entity_1.Role);
    let superAdminRole = await roleRepo.findOne({ where: { name: roles_types_dto_1.RolesTypes.SUPER_ADMIN } });
    if (!superAdminRole) {
        superAdminRole = roleRepo.create({ name: roles_types_dto_1.RolesTypes.SUPER_ADMIN });
        await roleRepo.save(superAdminRole);
        console.log('✅ Role SUPER_ADMIN criada (sem permissões vinculadas).');
    }
    else {
        console.log('✅ Role SUPER_ADMIN já existe.');
    }
    const permissionEntities = await Promise.all(allPermissions.map(async (name) => {
        let existing = await permissionRepo.findOne({ where: { name } });
        if (!existing) {
            existing = permissionRepo.create({ name });
            await permissionRepo.save(existing);
        }
        return existing;
    }));
    console.log(`✅ ${permissionEntities.length} permissões criadas ou encontradas.`);
    let adminRole = await roleRepo.findOne({ where: { name: roles_types_dto_1.RolesTypes.ADMIN } });
    if (!adminRole) {
        adminRole = roleRepo.create({
            name: roles_types_dto_1.RolesTypes.ADMIN,
            permissions: permissionEntities,
        });
        await roleRepo.save(adminRole);
        console.log('✅ Role ADMIN criada.');
    }
    else {
        console.log('✅ Role ADMIN já existe.');
    }
    let assistantRole = await roleRepo.findOne({ where: { name: roles_types_dto_1.RolesTypes.ASSISTANT } });
    if (!assistantRole) {
        const assistantPermissions = permissionEntities.filter((p) => !restrictedByManager.includes(p.name));
        assistantRole = roleRepo.create({
            name: roles_types_dto_1.RolesTypes.ASSISTANT,
            permissions: assistantPermissions,
        });
        await roleRepo.save(assistantRole);
        console.log('✅ Role ASSISTANT criada.');
    }
    else {
        console.log('✅ Role ASSISTANT já existe.');
    }
    let professionalRole = await roleRepo.findOne({ where: { name: roles_types_dto_1.RolesTypes.HEALTHCARE_PROFESSIONAL } });
    if (!professionalRole) {
        const professionalPermissions = permissionEntities.filter((p) => !restrictedByProfessional.includes(p.name));
        professionalRole = roleRepo.create({
            name: roles_types_dto_1.RolesTypes.HEALTHCARE_PROFESSIONAL,
            permissions: professionalPermissions,
        });
        await roleRepo.save(professionalRole);
        console.log('✅ Role HEALTHCARE_PROFESSIONAL criada.');
    }
    else {
        console.log('✅ Role HEALTHCARE_PROFESSIONAL já existe.');
    }
}
//# sourceMappingURL=seed-permissions-roles.js.map