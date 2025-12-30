import { Command, CommandRunner, Option } from 'nest-commander';
import { AuthService } from '@/modules/auth/auth.service';
import { UsersService } from '@/modules/users/users.service';
import { RolesTypes } from '@/modules/roles/dtos/roles-types.dto';
import { SystemModuleName } from '@/entities/system-module.entity';
import AppDataSource from '@/data-source';

interface CommandOptions {
  email?: string;
  password?: string;
}

@Command({ 
  name: 'seed:account', 
  description: 'Cria uma conta master via AuthService e gera 20 usuários membros' 
})
export class CreateAccountSeedCommand extends CommandRunner {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {
    super();
  }

  async run(passedParam: string[], options?: CommandOptions): Promise<void> {
    const email = options?.email || `admin_${Date.now()}@teste.com`;
    const password = options?.password || 'Teste123#';

    console.log(`🚀 Iniciando fluxo de Signup para: ${email}...`);

    try {
      // 1. Criar a Conta e o Admin usando o fluxo oficial de Signup
      // Isso já cria: User, Account, Trial, Metas (Terms) e vincula tudo.
      const { user: authResponse } = await this.authService.signup({
        email,
        password,
        name: `Admin ${email.split('@')[0]}`,
        termsAccepted: true,
        cellphone: '11999999999',
        cpf: '00000000000',
        moduleType: SystemModuleName.CAREER_DEVELOPMENT
      });

      // Buscar o user completo para obter o account_id
      const user = await this.usersService.findByEmail(email, ['account']);
      if (!user || !user.account_id) {
        throw new Error('Falha ao obter account_id após criação do usuário');
      }

      const accountId = user.account_id;
      const domain = email.split('@')[1];

      console.log(`✅ Conta ${accountId} e Admin criados com sucesso.`);
      console.log(`⏳ Gerando 20 usuários adicionais para esta conta...`);

      // 2. Criar 20 usuários secundários (Membros)
      // Usamos um loop simples. Se preferir performance extrema, pode usar Promise.all
      // mas para seed de dev, o loop garante a ordem e logs limpos.
      
      const queryRunner = AppDataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      try {
        for (let i = 1; i <= 20; i++) {
          await this.usersService.createSecondaryUser(
            RolesTypes.MEMBER,
            {
              email: `membro${i}@${domain}`,
              password: password,
              name: `Membro Teste ${i}`,
              cellphone: '11888888888',
              cpf: '00000000000',
              role: RolesTypes.MEMBER
            },
            accountId,
            queryRunner.manager
          );
          
          if (i % 5 === 0) console.log(`   > ${i} usuários criados...`);
        }

        await queryRunner.commitTransaction();
      } catch (err) {
        await queryRunner.rollbackTransaction();
        throw err;
      } finally {
        await queryRunner.release();
      }

      console.log(`\n✨ Seed finalizado com sucesso!`);
      console.log(`🔗 Conta ID: ${accountId}`);
      console.log(`📧 Login Admin: ${email}`);
      console.log(`🔑 Senha: ${password}`);
      console.log(`👥 Total na conta: 21 usuários`);

    } catch (error) {
      console.error('❌ Falha ao executar comando de seed:');
      console.error(error.message);
    }
  }

  @Option({
    flags: '-e, --email [string]',
    description: 'Email do administrador da conta',
  })
  parseEmail(val: string): string {
    return val;
  }

  @Option({
    flags: '-p, --password [string]',
    description: 'Senha para todos os usuários criados',
  })
  parsePassword(val: string): string {
    return val;
  }
}
