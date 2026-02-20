import { Command, CommandRunner, Option } from 'nest-commander';
import { AuthService } from '@/modules/auth/auth.service';
import { UsersService } from '@/modules/users/users.service';
import { TeamsService } from '@/modules/teams/teams.service';
import { SectorsService } from '@/modules/sectors/sectors.service';
import { JobPositionService } from '@/modules/job-positions/job-positions.service';
import { EvaluationsService } from '@/modules/evaluations/evaluations.service';
import { FormApplicationsService } from '@/modules/form-applications/form-applications.service';
import { FormAnswersService } from '@/modules/form-answers/form-answers.service';
import { CareerPlansService } from '@/modules/career-plans/career-plans.service';
import { RolesTypes } from '@/modules/roles/dtos/roles-types.dto';
import { SystemModuleName } from '@/entities/system-module.entity';
import {
  EvaluationApplication,
  EvaluationApplicationStatus,
  EvaluationType,
} from '@/entities/evaluation-application.entity';
import { FormResponse } from '@/entities/form-response.entity';
import { Evaluation } from '@/entities/evaluation.entity';
import { User } from '@/entities/user.entity';
import { Team } from '@/entities/team.entity';
import AppDataSource from '@/data-source';
import { faker } from '@faker-js/faker';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { QuestionType } from '@/common/enums/question-type.enum';
import type { EntityManager } from 'typeorm';

const scrypt = promisify(_scrypt);

// Configurar faker para usar locale brasileiro (se disponível)
// Caso contrário, usar métodos genéricos que funcionam bem
const fakerBr = faker;

interface CommandOptions {
  email?: string;
  password?: string;
}

/** Estrutura de papéis do usuário no time (para avaliação 360). */
interface UserTeamRole {
  leaderId: number | null;
  peerIds: number[];
  subordinateIds: number[];
}

@Command({
  name: 'seed:account',
  description:
    'Cria uma conta master via AuthService e gera 20 usuários membros com dados fake, setores, cargos, times e avaliações 360 + plano de carreira',
})
export class CreateAccountSeedCommand extends CommandRunner {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly teamsService: TeamsService,
    private readonly sectorsService: SectorsService,
    private readonly jobPositionService: JobPositionService,
    private readonly evaluationsService: EvaluationsService,
    private readonly formApplicationsService: FormApplicationsService,
    private readonly formAnswersService: FormAnswersService,
    private readonly careerPlansService: CareerPlansService,
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
          // Selecionar cargo aleatório e um nível desse cargo (cada cargo tem seu próprio grupo de níveis)
          let cargoId: number | undefined;
          let levelId: number | undefined;
          if (cargosCriados.length > 0) {
            const cargo = cargosCriados[fakerBr.number.int({ min: 0, max: cargosCriados.length - 1 })];
            cargoId = cargo.id;
            const levels = cargo.levelsGroup?.jobPositionsLevels;
            if (levels?.length) {
              const nivelEscolhido = levels[fakerBr.number.int({ min: 0, max: levels.length - 1 })];
              levelId = nivelEscolhido.id;
            }
          }

          const salt = randomBytes(8).toString('hex');
          const hashBuffer = (await scrypt(password, salt, 32)) as Buffer;
          const encryptedPassword = salt + '.' + hashBuffer.toString('hex');

          const novoUsuario = await this.usersService.createSecondaryUser(
            RolesTypes.MEMBER,
            {
              email: `membro${i}@${domain}`,
              password: encryptedPassword,
              name: nome,
              cellphone: cellphone,
              cpf: cpf,
              role: RolesTypes.MEMBER
            },
            accountId,
            queryRunner.manager,
            cargoId,
            levelId
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

      // 7. Aguardar avaliações (criadas pelos seeders) e popular evaluation-applications 360 + plano de carreira
      const maxWaitMs = 30_000;
      const intervalMs = 2_000;
      let evaluationByJobPositionUuid: Map<string, Evaluation> = new Map();
      const startedAt = Date.now();
      console.log(`⏳ Aguardando avaliações (DRD/Evaluation) dos seeders (retentativas a cada ${intervalMs / 1000}s, até ${maxWaitMs / 1000}s)...`);
      while (Date.now() - startedAt < maxWaitMs) {
        evaluationByJobPositionUuid = await this.buildEvaluationByJobPositionUuid(accountId);
        if (evaluationByJobPositionUuid.size > 0) break;
        await new Promise((r) => setTimeout(r, intervalMs));
      }

      if (evaluationByJobPositionUuid.size === 0) {
        console.log(`   ⚠️ Nenhuma avaliação encontrada para a conta após ${maxWaitMs / 1000}s; pulando seed de evaluation-applications.`);
      } else {
        console.log(`   ✓ ${evaluationByJobPositionUuid.size} avaliação(ões) por cargo encontrada(s).`);
        const jobPositionIdToUuid = new Map(cargosCriados.map((jp) => [jp.id, jp.uuid]));
        const teamsWithLeaderAndMembers = await AppDataSource.getRepository(Team).find({
          where: { account_id: accountId },
          relations: ['leader', 'teamMembers', 'teamMembers.user'],
        });
        const userTeamRoleMap = this.buildUserTeamRoleMap(teamsWithLeaderAndMembers);
        const allUsers: User[] = [user, ...usuariosCriados];
        const careerPlanNextJobMap = await this.buildCareerPlanNextJobMap(accountId);

        await this.seedEvaluationApplications360(
          accountId,
          allUsers,
          userTeamRoleMap,
          evaluationByJobPositionUuid,
          jobPositionIdToUuid,
        );
        await this.seedCareerPlanEvaluationApplications(
          accountId,
          allUsers,
          userTeamRoleMap,
          evaluationByJobPositionUuid,
          jobPositionIdToUuid,
          careerPlanNextJobMap,
        );
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

  /** Mapa job_position_uuid -> Evaluation (com form.topics.questions) para a conta. Usa uuid já retornado pelas queries do service. */
  private async buildEvaluationByJobPositionUuid(
    accountId: number,
  ): Promise<Map<string, Evaluation>> {
    const evaluations = await this.evaluationsService.findAllWithAccountId(accountId);
    const map = new Map<string, Evaluation>();
    for (const ev of evaluations) {
      const jobPositionUuid = ev.drd?.jobPosition?.uuid;
      if (!jobPositionUuid) continue;
      try {
        const full = await this.evaluationsService.findOneWithRelations(ev.uuid, accountId);
        const uuid = full?.drd?.jobPosition?.uuid;
        if (uuid && full?.form?.topics?.length) map.set(uuid, full);
      } catch {
        // ignorar avaliação sem form/tópicos
      }
    }
    return map;
  }

  /** Mapa user_id -> { leaderId, peerIds, subordinateIds } a partir dos times. */
  private buildUserTeamRoleMap(
    teams: Array<Team & { leader?: User; teamMembers?: Array<{ user_id: number; user?: User }> }>,
  ): Map<number, UserTeamRole> {
    const map = new Map<number, UserTeamRole>();
    for (const team of teams) {
      const leaderId = team.leader_user_id ?? team.leader?.id;
      const memberIds = (team.teamMembers ?? [])
        .map((m) => m.user_id ?? m.user?.id)
        .filter((id): id is number => id != null);
      if (leaderId == null) continue;
      for (const uid of memberIds) {
        const current = map.get(uid) ?? {
          leaderId: null,
          peerIds: [],
          subordinateIds: [],
        };
        if (uid === leaderId) {
          current.subordinateIds = memberIds.filter((id) => id !== leaderId);
        } else {
          current.leaderId = leaderId;
          current.peerIds = memberIds.filter((id) => id !== uid && id !== leaderId);
        }
        map.set(uid, current);
      }
    }
    return map;
  }

  /** Mapa user.job_position_id -> próximo job_position_id na sequência do plano de carreira (quando existir). */
  private async buildCareerPlanNextJobMap(
    accountId: number,
  ): Promise<Map<number, number>> {
    const plans = await this.careerPlansService.findAllWithAccountId(accountId);
    const nextByCurrentJobId = new Map<number, number>();
    for (const plan of plans) {
      const steps = (plan.careerPlanJobPositions ?? []).sort(
        (a, b) => (a.order ?? 0) - (b.order ?? 0),
      );
      for (let i = 0; i < steps.length - 1; i++) {
        const current = steps[i].job_position_id;
        const next = steps[i + 1].job_position_id;
        if (current != null && next != null) nextByCurrentJobId.set(current, next);
      }
    }
    return nextByCurrentJobId;
  }

  /**
   * Cria evaluation-applications no formato 360 (SELF, LEADER, PEER, SUBORDINATE) para cada usuário,
   * 1 ciclo por mês nos últimos 6 meses, com status FINISHED e form-responses.
   */
  private async seedEvaluationApplications360(
    accountId: number,
    users: User[],
    userTeamRoleMap: Map<number, UserTeamRole>,
    evaluationByJobPositionUuid: Map<string, Evaluation>,
    jobPositionIdToUuid: Map<number, string>,
  ): Promise<void> {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const now = new Date();
      let totalApps = 0;
      for (const evaluatedUser of users) {
        const jobPositionUuid = evaluatedUser.job_position_id
          ? jobPositionIdToUuid.get(evaluatedUser.job_position_id)
          : undefined;
        const evaluation = jobPositionUuid
          ? evaluationByJobPositionUuid.get(jobPositionUuid)
          : undefined;
        if (!evaluation) continue;

        const role = userTeamRoleMap.get(evaluatedUser.id) ?? {
          leaderId: null,
          peerIds: [],
          subordinateIds: [],
        };

        for (let monthOffset = 5; monthOffset >= 0; monthOffset--) {
          const finishedAt = new Date(now.getFullYear(), now.getMonth() - monthOffset, 15, 12, 0, 0, 0);
          const startedDate = new Date(finishedAt);
          startedDate.setDate(startedDate.getDate() - 7);
          const expirationDate = new Date(finishedAt);
          expirationDate.setDate(expirationDate.getDate() + 7);

          const evaluators: { type: EvaluationType; submittingUserId: number }[] = [
            { type: EvaluationType.SELF, submittingUserId: evaluatedUser.id },
          ];
          if (role.leaderId != null)
            evaluators.push({ type: EvaluationType.LEADER, submittingUserId: role.leaderId });
          for (const peerId of role.peerIds)
            evaluators.push({ type: EvaluationType.PEER, submittingUserId: peerId });
          for (const subId of role.subordinateIds)
            evaluators.push({ type: EvaluationType.SUBORDINATE, submittingUserId: subId });

          for (const { type, submittingUserId } of evaluators) {
            const app = await this.createFinishedEvaluationApplication(
              queryRunner,
              accountId,
              evaluation,
              evaluatedUser.id,
              submittingUserId,
              type,
              finishedAt,
              startedDate,
              expirationDate,
            );
            if (app) totalApps++;
          }
        }
      }
      await queryRunner.commitTransaction();
      console.log(`   ✓ Avaliações 360: ${totalApps} evaluation-applications FINISHED (6 meses, 21 usuários).`);
    } catch (err) {
      await queryRunner.rollbackTransaction();
      console.log(`   ⚠️ Erro ao criar avaliações 360: ${err?.message}`);
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * Cria evaluation-applications para o próximo cargo no plano de carreira (apenas LEADER + SELF),
   * nos últimos 3 meses, para pelo menos 3 usuários que tenham próximo cargo definido.
   */
  private async seedCareerPlanEvaluationApplications(
    accountId: number,
    users: User[],
    userTeamRoleMap: Map<number, UserTeamRole>,
    evaluationByJobPositionUuid: Map<string, Evaluation>,
    jobPositionIdToUuid: Map<number, string>,
    careerPlanNextJobMap: Map<number, number>,
  ): Promise<void> {
    const candidates = users.filter((u) => u.job_position_id != null && careerPlanNextJobMap.has(u.job_position_id));
    const toProcess = candidates.length >= 3 ? candidates.slice(0, 3) : candidates;
    if (toProcess.length === 0) {
      console.log(`   ⚠️ Nenhum usuário com próximo cargo no plano de carreira; pulando avaliações de carreira.`);
      return;
    }

    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const now = new Date();
      let totalApps = 0;
      for (const evaluatedUser of toProcess) {
        const nextJobPositionId = careerPlanNextJobMap.get(evaluatedUser.job_position_id!);
        const nextJobPositionUuid = nextJobPositionId ? jobPositionIdToUuid.get(nextJobPositionId) : undefined;
        const evaluation = nextJobPositionUuid
          ? evaluationByJobPositionUuid.get(nextJobPositionUuid)
          : undefined;
        if (!evaluation) continue;

        const role = userTeamRoleMap.get(evaluatedUser.id) ?? {
          leaderId: null,
          peerIds: [],
          subordinateIds: [],
        };

        for (let monthOffset = 2; monthOffset >= 0; monthOffset--) {
          const finishedAt = new Date(now.getFullYear(), now.getMonth() - monthOffset, 15, 12, 0, 0, 0);
          const startedDate = new Date(finishedAt);
          startedDate.setDate(startedDate.getDate() - 7);
          const expirationDate = new Date(finishedAt);
          expirationDate.setDate(expirationDate.getDate() + 7);

          const evaluators: { type: EvaluationType; submittingUserId: number }[] = [
            { type: EvaluationType.SELF, submittingUserId: evaluatedUser.id },
          ];
          if (role.leaderId != null)
            evaluators.push({ type: EvaluationType.LEADER, submittingUserId: role.leaderId });

          for (const { type, submittingUserId } of evaluators) {
            const app = await this.createFinishedEvaluationApplication(
              queryRunner,
              accountId,
              evaluation,
              evaluatedUser.id,
              submittingUserId,
              type,
              finishedAt,
              startedDate,
              expirationDate,
            );
            if (app) totalApps++;
          }
        }
      }
      await queryRunner.commitTransaction();
      console.log(`   ✓ Avaliações plano de carreira (próximo cargo): ${totalApps} evaluation-applications FINISHED (3 meses, ${toProcess.length} usuários).`);
    } catch (err) {
      await queryRunner.rollbackTransaction();
      console.log(`   ⚠️ Erro ao criar avaliações de plano de carreira: ${err?.message}`);
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * Cria uma evaluation-application FINISHED com form-response e form-answers (respostas aleatórias para RATE).
   */
  private async createFinishedEvaluationApplication(
    queryRunner: { manager: EntityManager },
    accountId: number,
    evaluation: Evaluation,
    evaluatedUserId: number,
    submittingUserId: number,
    type: EvaluationType,
    finishedAt: Date,
    startedDate: Date,
    expirationDate: Date,
  ): Promise<EvaluationApplication | null> {
    if (!evaluation?.form?.topics?.length) return null;

    const formApplication = await this.formApplicationsService.createInTransaction(
      evaluation.form,
      accountId,
      queryRunner.manager,
    );
    const rate = Number(evaluation.rate) || 5;

    const app = queryRunner.manager.create(EvaluationApplication, {
      account_id: accountId,
      evaluation_id: evaluation.id,
      form_application_id: formApplication.id,
      drd_id: evaluation.drd_id ?? null,
      name: evaluation.name,
      description: evaluation.description ?? null,
      rate: evaluation.rate,
      type,
      recurrence: null,
      started_date: startedDate,
      expiration_date: expirationDate,
      expiration_days: null,
      evaluated_user_id: evaluatedUserId,
      submitting_user_id: submittingUserId,
      status: EvaluationApplicationStatus.FINISHED,
      finished_at: finishedAt,
    });
    const savedApp = await queryRunner.manager.save(EvaluationApplication, app);

    const formResponse = queryRunner.manager.create(FormResponse, {
      form_application_id: formApplication.id,
      evaluation_application_id: savedApp.id,
      user_id: submittingUserId,
      is_completed: true,
      submitted_at: finishedAt,
    });
    const savedResponse = await queryRunner.manager.save(FormResponse, formResponse);

    const questions = (formApplication.applicationTopics ?? []).flatMap((t) => t.questions ?? []);
    for (const q of questions) {
      const numberValue =
        q.type === QuestionType.RATE || q.type === QuestionType.NUMBER
          ? fakerBr.number.int({ min: 1, max: Math.max(1, rate) })
          : null;
      await this.formAnswersService.createInTransaction(
        savedResponse.id,
        q,
        {
          application_question_uuid: q.uuid,
          number_value: numberValue ?? undefined,
        },
        queryRunner.manager,
      );
    }
    return savedApp;
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
