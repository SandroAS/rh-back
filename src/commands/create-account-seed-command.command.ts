import { Command, CommandRunner, Option } from 'nest-commander';
import { AuthService } from '@/modules/auth/auth.service';
import { UsersService } from '@/modules/users/users.service';
import { TeamsService } from '@/modules/teams/teams.service';
import { SectorsService } from '@/modules/sectors/sectors.service';
import { JobPositionService } from '@/modules/job-positions/job-positions.service';
import { RolesTypes } from '@/modules/roles/dtos/roles-types.dto';
import { SystemModuleName } from '@/entities/system-module.entity';
import AppDataSource from '@/data-source';
import { Faker, faker } from '@faker-js/faker';
import { ptBR } from '@faker-js/locale-pt_BR';

// Criar instância do faker com locale brasileiro
const fakerBr = new Faker({ locale: ptBR });

interface CommandOptions {
  email?: string;
  password?: string;
}

@Command({ 
  name: 'seed:account', 
  description: 'Cria uma conta master via AuthService e gera 20 usuários membros com dados fake, setores, cargos e times' 
})
export class CreateAccountSeedCommand extends CommandRunner {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly teamsService: TeamsService,
    private readonly sectorsService: SectorsService,
    private readonly jobPositionService: JobPositionService,
  ) {
    super();
  }

  async run(passedParam: string[], options?: CommandOptions): Promise<void> {
    const email = options?.email || `admin_${Date.now()}@teste.com`;
    const password = options?.password || 'Teste123#';

    console.log(`🚀 Iniciando fluxo de Signup para: ${email}...`);

    try {
      if (!AppDataSource.isInitialized) {
        console.log('⏳ Aguardando conexão com o banco de dados...');
        await AppDataSource.initialize();
      }
      // 1. Criar a Conta e o Admin usando o fluxo oficial de Signup
      // Isso já cria: User, Account, Trial, Metas (Terms) e vincula tudo.
      const adminName = fakerBr.person.fullName();
      const adminCpf = fakerBr.string.numeric({ length: 11 });
      const adminCellphone = `11${fakerBr.string.numeric({ length: 9 })}`;
      
      const { user: authResponse } = await this.authService.signup({
        email,
        password,
        name: adminName,
        termsAccepted: true,
        cellphone: adminCellphone,
        cpf: adminCpf,
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
      console.log(`⏳ Aguardando seeders automáticos finalizarem (setores e cargos)...`);
      
      // Aguardar um pouco para garantir que os seeders assíncronos terminaram
      // Os seeders são executados via evento 'account.created' de forma assíncrona
      await new Promise(resolve => setTimeout(resolve, 3000));

      // 2. Buscar Setores já criados pelos seeders
      const setoresCriados = await this.sectorsService.findAllWithAccountId(accountId);
      if (setoresCriados.length === 0) {
        console.log(`⚠️  Nenhum setor encontrado. Aguardando mais um pouco...`);
        await new Promise(resolve => setTimeout(resolve, 2000));
        const setoresRetry = await this.sectorsService.findAllWithAccountId(accountId);
        if (setoresRetry.length === 0) {
          throw new Error('Setores não foram criados pelos seeders. Verifique se os seeders estão funcionando corretamente.');
        }
        setoresCriados.push(...setoresRetry);
      }
      console.log(`   ✓ ${setoresCriados.length} setores encontrados`);

      // 3. Buscar Cargos já criados pelos seeders
      const cargosCriados = await this.jobPositionService.findAllWithAccountId(accountId);
      if (cargosCriados.length === 0) {
        console.log(`⚠️  Nenhum cargo encontrado. Aguardando mais um pouco...`);
        await new Promise(resolve => setTimeout(resolve, 2000));
        const cargosRetry = await this.jobPositionService.findAllWithAccountId(accountId);
        if (cargosRetry.length === 0) {
          throw new Error('Cargos não foram criados pelos seeders. Verifique se os seeders estão funcionando corretamente.');
        }
        cargosCriados.push(...cargosRetry);
      }
      console.log(`   ✓ ${cargosCriados.length} cargos encontrados`);

      // 4. Criar 20 usuários secundários com dados fake
      console.log(`⏳ Gerando 20 usuários com dados fake...`);
      
      const queryRunner = AppDataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const usuariosCriados = [];
      try {
        for (let i = 1; i <= 20; i++) {
          const nome = fakerBr.person.fullName();
          const cpf = fakerBr.string.numeric({ length: 11 });
          const cellphone = `11${fakerBr.string.numeric({ length: 9 })}`;
          // Selecionar cargo aleatório, mas garantir que há cargos disponíveis
          const cargoId = cargosCriados.length > 0 
            ? cargosCriados[fakerBr.number.int({ min: 0, max: cargosCriados.length - 1 })].id
            : undefined;

          const novoUsuario = await this.usersService.createSecondaryUser(
            RolesTypes.MEMBER,
            {
              email: `membro${i}@${domain}`,
              password: password,
              name: nome,
              cellphone: cellphone,
              cpf: cpf,
              role: RolesTypes.MEMBER
            },
            accountId,
            queryRunner.manager,
            cargoId
          );
          
          usuariosCriados.push(novoUsuario);
          
          if (i % 5 === 0) console.log(`   > ${i} usuários criados...`);
        }

        await queryRunner.commitTransaction();
      } catch (err) {
        await queryRunner.rollbackTransaction();
        throw err;
      } finally {
        await queryRunner.release();
      }

      // 5. Atribuir usuários aos setores
      console.log(`⏳ Atribuindo usuários aos setores...`);
      const usuariosPorSetor = Math.floor(usuariosCriados.length / setoresCriados.length);
      let usuarioIndex = 0;
      
      for (let i = 0; i < setoresCriados.length; i++) {
        const setor = setoresCriados[i];
        const usuariosDoSetor = usuariosCriados.slice(
          usuarioIndex, 
          i === setoresCriados.length - 1 ? usuariosCriados.length : usuarioIndex + usuariosPorSetor
        );
        
        if (usuariosDoSetor.length > 0) {
          const userUuids = usuariosDoSetor.map(u => u.uuid);
          await this.sectorsService.updateWithAccountId(
            setor.uuid,
            { name: setor.name, user_uuids: userUuids },
            accountId
          );
          console.log(`   ✓ ${usuariosDoSetor.length} usuários atribuídos ao setor ${setor.name}`);
        }
        
        usuarioIndex += usuariosPorSetor;
      }

      // 6. Criar Times
      console.log(`⏳ Criando times e atribuindo membros...`);
      
      // Criar times baseados nos setores disponíveis
      // Vamos criar até 4 times, distribuindo os usuários
      const numTimes = Math.min(4, setoresCriados.length, Math.floor(usuariosCriados.length / 3));
      const usuariosPorTime = Math.floor(usuariosCriados.length / numTimes);
      
      const timesCriados = [];
      let usuarioIndexTime = 0;
      
      for (let i = 0; i < numTimes; i++) {
        const setor = setoresCriados[i % setoresCriados.length];
        const leader = usuariosCriados[usuarioIndexTime];
        
        const startIndex = usuarioIndexTime + 1;
        const endIndex = i === numTimes - 1 
          ? usuariosCriados.length 
          : Math.min(startIndex + usuariosPorTime - 1, usuariosCriados.length);
        
        const members = usuariosCriados.slice(startIndex, endIndex);
        const memberUuids = [leader.uuid, ...members.map(m => m.uuid)];
        
        const timeName = `Time ${setor.name}`;
        
        try {
          const time = await this.teamsService.createWithAccountId(
            {
              name: timeName,
              leader: leader.uuid,
              sector_uuid: setor.uuid,
              member_uuids: memberUuids
            },
            user
          );
          
          timesCriados.push(time);
          console.log(`   ✓ Time criado: ${timeName} com ${memberUuids.length} membros`);
        } catch (err) {
          console.log(`   ⚠️  Erro ao criar time ${timeName}: ${err.message}`);
        }
        
        usuarioIndexTime = endIndex;
      }

      console.log(`\n✨ Seed finalizado com sucesso!`);
      console.log(`🔗 Conta ID: ${accountId}`);
      console.log(`📧 Login Admin: ${email}`);
      console.log(`🔑 Senha: ${password}`);
      console.log(`👥 Total na conta: 21 usuários`);
      console.log(`🏢 Setores criados: ${setoresCriados.length}`);
      console.log(`💼 Cargos criados: ${cargosCriados.length}`);
      console.log(`👨‍👩‍👧‍👦 Times criados: ${timesCriados.length}`);

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
