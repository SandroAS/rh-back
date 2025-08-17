import { RolesTypes } from '@/modules/roles/dtos/roles-types.dto';
import AppDataSource from '../data-source';
import { Permission } from '../entities/permission.entity';
import { Role } from '../entities/role.entity';

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
  'evaluations_read',
  'evaluations_create',
  'evaluations_update',
  'evaluations_delete',
  'evaluation_applications_read',
  'evaluation_applications_create',
  'evaluation_applications_update',
  'evaluation_applications_delete',
  'team_panel_read',
  'user_panel_read',
];

// permissões restritas por role
const restrictedByManager = [
  'users_settings_read',
  'users_settings_update',
  'users_settings_create',
  'users_settings_deactive',
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
  'evaluations_read',
  'evaluations_create',
  'evaluations_update',
  'evaluations_delete',
  'evaluation_applications_read',
  'evaluation_applications_create',
  'evaluation_applications_update',
  'evaluation_applications_delete',
  'team_panel_read',
  'user_panel_read',
  'pdi_read',
  'pdi_create',
  'pdi_update',
  'pdi_delete'
];

const restrictedByLeader = [
  'users_settings_read',
  'users_settings_update',
  'users_settings_create',
  'users_settings_deactive',
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
  'evaluations_read',
  'evaluations_create',
  'evaluations_update',
  'evaluations_delete',
  'evaluation_applications_read',
  'evaluation_applications_create',
  'evaluation_applications_update',
  'evaluation_applications_delete',
  'team_panel_read',
  'user_panel_read',
  'pdi_read',
  'pdi_create',
  'pdi_update',
  'pdi_delete',
];

const restrictedByMember = [
  'job_positions_read',
  'levels_groups_read',
  'teams_read',
  'drd_read',
  'career_plans_read',
  'evaluations_read',
  'evaluations_create',
  'evaluations_update',
  'evaluations_delete',
  'evaluation_applications_read',
  'evaluation_applications_update',
  'team_panel_read',
  'user_panel_read',
  'pdi_read',
  'pdi_create',
  'pdi_update',
  'pdi_delete',
];

export async function seedPermissionsRoles() {
  const permissionRepo = AppDataSource.getRepository(Permission);
  const roleRepo = AppDataSource.getRepository(Role);

  // Cria role SUPER_ADMIN sem permissões vinculadas
  let superAdminRole = await roleRepo.findOne({ where: { name: RolesTypes.SUPER_ADMIN } });
  if (!superAdminRole) {
    superAdminRole = roleRepo.create({ name: RolesTypes.SUPER_ADMIN });
    await roleRepo.save(superAdminRole);
    console.log('✅ Role SUPER_ADMIN criada (sem permissões vinculadas).');
  } else {
    console.log('✅ Role SUPER_ADMIN já existe.');
  }

  // Cria as permissões
  const permissionEntities = await Promise.all(
    allPermissions.map(async (name) => {
      let existing = await permissionRepo.findOne({ where: { name } });
      if (!existing) {
        existing = permissionRepo.create({ name });
        await permissionRepo.save(existing);
      }
      return existing;
    })
  );
  console.log(`✅ ${permissionEntities.length} permissões criadas ou encontradas.`);

  // Cria role ADMIN com todas as permissões
  let adminRole = await roleRepo.findOne({ where: { name: RolesTypes.ADMIN } });
  if (!adminRole) {
    adminRole = roleRepo.create({
      name: RolesTypes.ADMIN,
      permissions: permissionEntities,
    });
    await roleRepo.save(adminRole);
    console.log('✅ Role ADMIN criada.');
  } else {
    console.log('✅ Role ADMIN já existe.');
  }

  let managerRole = await roleRepo.findOne({ where: { name: RolesTypes.MANAGER } });
  if (!managerRole) {
    const managerPermissions = permissionEntities.filter(
      (p) => !restrictedByManager.includes(p.name)
    );
    managerRole = roleRepo.create({
      name: RolesTypes.MANAGER,
      permissions: managerPermissions,
    });
    await roleRepo.save(managerRole);
    console.log(`✅ Role ${RolesTypes.MANAGER} criada.`);
  } else {
    console.log(`✅ Role ${RolesTypes.MANAGER} já existe.`);
  }

  let leaderRole = await roleRepo.findOne({ where: { name: RolesTypes.LEADER } });
  if (!leaderRole) {
    const leaderPermissions = permissionEntities.filter(
      (p) => !restrictedByLeader.includes(p.name)
    );
    leaderRole = roleRepo.create({
      name: RolesTypes.LEADER,
      permissions: leaderPermissions,
    });
    await roleRepo.save(leaderRole);
    console.log(`✅ Role ${RolesTypes.LEADER} criada.`);
  } else {
    console.log(`✅ Role ${RolesTypes.LEADER} já existe.`);
  }

  let memberRole = await roleRepo.findOne({ where: { name: RolesTypes.MEMBER } });
  if (!memberRole) {
    const memberPermissions = permissionEntities.filter(
      (p) => !restrictedByMember.includes(p.name)
    );
    memberRole = roleRepo.create({
      name: RolesTypes.MEMBER,
      permissions: memberPermissions,
    });
    await roleRepo.save(memberRole);
    console.log('✅ Role MEMBER criada.');
  } else {
    console.log('✅ Role MEMBER já existe.');
  }
}
