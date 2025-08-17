import AppDataSource from '../data-source';
import { Plan } from '../entities/plan.entity';

export async function seedPlans() {
  const plans = [
    {
      name: 'Essencial Mensal',
      description: '1 administrador + até 20 gerentes/líderes/membros. Ideal para empresas menores.',
      base_price: 200.00,
      interval: 'monthly',
    },
    {
      name: 'Essencial Anual',
      description: '1 administrador + até 20 gerentes/líderes/membros. Versão anual com desconto.',
      base_price: 2000.00,
      interval: 'yearly',
    },
    {
      name: 'Profissional Mensal',
      description: '1 administrador + gerentes/líderes/membros ilimitados. Ideal para empresas em crescimento.',
      base_price: 200.00,
      price_per_user: 20.00,
      interval: 'monthly',
    },
    {
      name: 'Profissional Anual',
      description: 'Plano completo anual com suporte para múltiplos usuários.',
      base_price: 2000.00,
      price_per_user: 200.00,
      interval: 'yearly',
    },
  ] as const;

  const planRepo = AppDataSource.getRepository(Plan);

  for (const planData of plans) {
    const exists = await planRepo.findOneBy({ name: planData.name });
    if (!exists) {
      const plan = planRepo.create(planData);
      await planRepo.save(plan);
      console.log(`✅ Plano ${planData.name} inserido com sucesso!`);
    } else {
      console.log(`✅ Plano ${planData.name} já existe.`);
    }
  }
}
