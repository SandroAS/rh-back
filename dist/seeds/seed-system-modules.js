"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedSystemModules = seedSystemModules;
const data_source_1 = require("../data-source");
const system_module_entity_1 = require("../entities/system-module.entity");
async function seedSystemModules() {
    const systemModules = [
        { name: system_module_entity_1.SystemModuleName.DENTISTRY },
        { name: system_module_entity_1.SystemModuleName.PSYCHOLOGY },
        { name: system_module_entity_1.SystemModuleName.NUTRITION },
        { name: system_module_entity_1.SystemModuleName.PHYSIOTHERAPY },
    ];
    const systemModuleRepo = data_source_1.default.getRepository(system_module_entity_1.SystemModule);
    for (const moduleData of systemModules) {
        const exists = await systemModuleRepo.findOneBy({ name: moduleData.name });
        if (!exists) {
            const module = systemModuleRepo.create(moduleData);
            await systemModuleRepo.save(module);
            console.log(`✅ Módulo de sistema "${moduleData.name}" inserido com sucesso.`);
        }
        else {
            console.log(`✅ Módulo de sistema "${moduleData.name}" já existe. Pulando inserção.`);
        }
    }
}
//# sourceMappingURL=seed-system-modules.js.map