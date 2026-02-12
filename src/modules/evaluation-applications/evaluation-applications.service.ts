import { Injectable, NotFoundException, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, EntityManager, In } from 'typeorm';
import { EvaluationApplication, EvaluationApplicationStatus, EvaluationType } from '@/entities/evaluation-application.entity';
import { QuestionType } from '@/common/enums/question-type.enum';
import { User } from '@/entities/user.entity';
import { PaginationDto } from '@/common/dtos/pagination.dto';
import { BaseService, PaginationResult } from '@/common/services/base.service';
import { CreateEvaluationApplicationDto } from './dtos/create-evaluation-application.dto';
import { UpdateEvaluationApplicationDto } from './dtos/update-evaluation-application.dto';
import { FormApplicationsService } from '../form-applications/form-applications.service';
import { EvaluationsService } from '../evaluations/evaluations.service';
import { Evaluation } from '@/entities/evaluation.entity';
import { SendEvaluationApplicationDto } from './dtos/send-evaluation-application.dto';
import { NotificationsService } from '../notifications/notifications.service';
import { NotificationCategory, NotificationTemplateKey } from '@/entities/notification.entity';
import { EvaluationApplicationFilterDto } from './dtos/metrics-evaluation-application.dto';
import { UsersService } from '../users/users.service';
import { QuartileLabel } from './dtos/ranking-by-quartiles-response.dto';

@Injectable()
export class EvaluationApplicationsService extends BaseService<EvaluationApplication> {
  constructor(
    @InjectRepository(EvaluationApplication)
    private readonly evaluationApplicationRepository: Repository<EvaluationApplication>,
    private readonly dataSource: DataSource,
    private readonly formApplicationsService: FormApplicationsService,
    private readonly evaluationsService: EvaluationsService,
    private readonly notificationsService: NotificationsService,
    private readonly usersService: UsersService,
  ) {
    super(evaluationApplicationRepository);
  }

  /**
   * Cria uma ou mais aplicação de avaliação em transação (CREATE).
   */
  async createByAccountId(
    payload: CreateEvaluationApplicationDto,
    accountId: number,
    user: User,
  ): Promise<EvaluationApplication[]> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const createdApplications: EvaluationApplication[] = [];
      
      // Cache para evitar recarregar o mesmo modelo várias vezes na mesma transação
      const evaluationCache = new Map<string, Evaluation>();

      // Se houver um uuid global, já o carregamos e colocamos no cache
      if (payload.evaluation_uuid) {
        const globalEval = await this.evaluationsService.findOneWithRelations(payload.evaluation_uuid, accountId);
        evaluationCache.set(payload.evaluation_uuid, globalEval);
      }

      for (const applicationPayload of payload.applications) {
        // Determina qual UUID usar: o do item ou o global
        const currentEvalUuid = applicationPayload.evaluation_uuid || payload.evaluation_uuid;

        if (!currentEvalUuid) {
          throw new ConflictException(`Um modelo de avaliação (evaluation_uuid) deve ser fornecido globalmente ou por aplicação.`);
        }

        let evaluation = evaluationCache.get(currentEvalUuid);
        if (!evaluation) {
          evaluation = await this.evaluationsService.findOneWithRelations(currentEvalUuid, accountId)
            .catch(() => {
              throw new NotFoundException(`Modelo de avaliação ${currentEvalUuid} não encontrado.`);
            });
          evaluationCache.set(currentEvalUuid, evaluation);
        }

        const formApplicationDataSaved = await this.formApplicationsService.createInTransaction(
          evaluation.form,
          accountId,
          queryRunner.manager
        );

        const evaluatedUser = await queryRunner.manager.findOneBy(User, { uuid: applicationPayload.evaluated_user_uuid });
        const submittingUser = await queryRunner.manager.findOneBy(User, { uuid: applicationPayload.submitting_user_uuid });

        if (!evaluatedUser || !submittingUser) {
          throw new NotFoundException(`Usuário para aplicação de avaliação não encontrado ao tentar criar a aplicação (Avaliado: ${applicationPayload.evaluated_user_uuid}, Avaliador: ${applicationPayload.submitting_user_uuid}).`);
        }

        // Converte as datas para objetos Date (vêm como string do DTO)
        const startedDate = payload.started_date ? new Date(payload.started_date) : null;
        const expirationDate = payload.expiration_date ? new Date(payload.expiration_date) : null;

        const newEvaluationApplication = queryRunner.manager.create(EvaluationApplication, {
          account_id: accountId,
          evaluation_id: evaluation.id,
          form_application_id: formApplicationDataSaved.id,
          drd_id: evaluation.drd_id,
          name: evaluation.name,
          description: evaluation.description,
          rate: evaluation.rate,
          type: applicationPayload.type,
          started_date: startedDate,
          expiration_date: expirationDate,
          status: EvaluationApplicationStatus.CREATED,
          evaluated_user_id: evaluatedUser.id,
          submitting_user_id: submittingUser.id,
        });

        const createdApplication = await queryRunner.manager.save(EvaluationApplication, newEvaluationApplication);

        createdApplication.evaluation = evaluation;
        createdApplication.evaluatedUser = evaluatedUser;
        createdApplication.submittingUser = submittingUser;

        createdApplications.push(createdApplication);
      }

      await queryRunner.commitTransaction();
      return createdApplications;

    } catch (err) {
      await queryRunner.rollbackTransaction();

      if (err instanceof NotFoundException || err instanceof ConflictException) {
        throw err;
      }

      console.error('Erro ao criar Evaluation Application:', err);
      throw new InternalServerErrorException('Falha ao concluir a criação da aplicação de avaliação.');
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * Busca e pagina as aplicações de avaliação por conta (PAGINATION).
   * Utiliza super.findAndPaginate, mantendo o padrão do BaseService.
   */
  async findAndPaginateByAccountId(
    pagination: PaginationDto,
    accountId: number,
    searchColumns: string[] = ['name', 'status'] 
  ): Promise<PaginationResult<EvaluationApplication>> {
    return super.findAndPaginate(pagination, searchColumns, (qb) => {
      qb.andWhere('entity.account_id = :accountId', { accountId });
      qb.leftJoin('entity.evaluation', 'evaluation')
        .leftJoin('entity.drd', 'drd')
        .leftJoin('drd.jobPosition', 'jobPosition')
        .leftJoin('entity.submittingUser', 'submittingUser')
        .leftJoin('entity.evaluatedUser', 'evaluatedUser');
      qb.select([
        'entity.id',
        'entity.uuid',
        'entity.name',
        'entity.description',
        'entity.rate',
        'entity.type',
        'entity.status',
        'entity.started_date',
        'entity.expiration_date',
        'entity.created_at',
        'entity.updated_at',
        'evaluation.uuid',
        'evaluation.name',
        'drd.uuid',
        'jobPosition.uuid',
        'jobPosition.title',
        'submittingUser.uuid',
        'submittingUser.name',
        'submittingUser.email',
        'submittingUser.profile_img_url',
        'evaluatedUser.uuid',
        'evaluatedUser.name',
        'evaluatedUser.email',
        'evaluatedUser.profile_img_url',
      ]);

      qb.orderBy('entity.created_at', 'DESC');
    });
  }

  /**
   * Retorna todas as aplicações de avaliação por conta (FIND ALL).
   */
  async findAllWithAccountId(accountId: number): Promise<EvaluationApplication[]> {
    return await this.evaluationApplicationRepository.createQueryBuilder('application')
      .leftJoin('application.evaluation', 'evaluation')
      .leftJoin('evaluation.drd', 'drd')
      .leftJoin('drd.jobPosition', 'jobPosition')
      .select([
        'application.uuid',
        'application.status',
        'application.candidate_name',
        'evaluation.uuid',
        'evaluation.name',
        'jobPosition.uuid',
        'jobPosition.title',
      ])
      .where('application.account_id = :accountId', { accountId })
      .orderBy('application.created_at', 'DESC')
      .getMany();
  }

  /**
   * Busca uma aplicação de avaliação pelo UUID com todas as relações necessárias (FIND ONE).
   */
  async findOneWithRelations(uuid: string, accountId: number): Promise<EvaluationApplication> {
    const application = await this.evaluationApplicationRepository.createQueryBuilder('application')
      .where('application.uuid = :uuid', { uuid })
      .andWhere('application.account_id = :accountId', { accountId })
      .leftJoinAndSelect('application.evaluation', 'evaluation')
      .leftJoinAndSelect('evaluation.drd', 'drd')
      .leftJoinAndSelect('drd.jobPosition', 'jobPosition')
      .leftJoinAndSelect('application.evaluatedUser', 'evaluatedUser')
      .leftJoinAndSelect('application.submittingUser', 'submittingUser')
      .leftJoinAndSelect('application.formApplication', 'formApplication')
      .leftJoinAndSelect('formApplication.applicationTopics', 'topics')
      .leftJoinAndSelect('topics.baseFormTopic', 'baseFormTopic')
      .leftJoinAndSelect('topics.questions', 'questions')
      .leftJoinAndSelect('questions.options', 'options')
      .orderBy('topics.order', 'ASC')
      .addOrderBy('questions.order', 'ASC')
      .getOne();

    if (!application) {
      throw new NotFoundException(`Evaluation Application with UUID ${uuid} not found.`);
    }

    return application;
  }

  /**
   * Busca uma aplicação de avaliação pelo UUID trazendo toda a estrutura do formulário.
   * Pode ser executado dentro de uma transação se um manager for fornecido.
   */
  async findByUuidWithFormRelations(
    uuid: string,
    manager?: EntityManager,
  ): Promise<EvaluationApplication> {
    const repo = manager ? manager.getRepository(EvaluationApplication) : this.evaluationApplicationRepository;

    const application = await repo.createQueryBuilder('entity')
      .leftJoinAndSelect('entity.formApplication', 'formApplication')
      .leftJoinAndSelect('formApplication.applicationTopics', 'topics')
      .leftJoinAndSelect('topics.questions', 'questions')
      .leftJoinAndSelect('questions.options', 'options')
      .where('entity.uuid = :uuid', { uuid })
      .orderBy('topics.order', 'ASC')
      .addOrderBy('questions.order', 'ASC')
      .getOne();

    if (!application) {
      throw new NotFoundException(`Aplicação de avaliação com UUID ${uuid} não encontrada.`);
    }

    return application;
  }

  /**
   * Atualiza uma aplicação de avaliação em transação (UPDATE).
   */
  async updateWithAccountId(
    uuid: string, 
    payload: UpdateEvaluationApplicationDto, 
    accountId: number
  ): Promise<EvaluationApplication> {
    try {
      const evaluationApplication = await this.evaluationApplicationRepository.findOne({
        where: { uuid, account_id: accountId }
      });

      if (!evaluationApplication) {
        throw new NotFoundException(`Application com UUID ${uuid} não encontrada.`);
      }

      const updateData = {
        started_date: new Date(payload.started_date),
        expiration_date: new Date(payload.expiration_date)
      };

      this.evaluationApplicationRepository.merge(evaluationApplication, updateData);
      const updatedApplication = await this.evaluationApplicationRepository.save(evaluationApplication);

      return await this.findOneWithRelations(updatedApplication.uuid, accountId); 

    } catch (err) {
      if (err instanceof NotFoundException || err instanceof ConflictException) {
        throw err;
      }

      console.error('Erro ao atualizar Evaluation Application:', err);
      throw new InternalServerErrorException('Falha ao concluir a atualização.');
    }
  }

  async cancel(
    uuid: string, 
    accountId: number
  ): Promise<EvaluationApplication> {
    try {
      const evaluationApplication = await this.evaluationApplicationRepository.findOne({
        where: { uuid, account_id: accountId }
      });

      if (!evaluationApplication) {
        throw new NotFoundException(`Application com UUID ${uuid} não encontrada.`);
      }

      if (evaluationApplication.status === EvaluationApplicationStatus.CANCELED ) {
        throw new ConflictException(`Aplicação com UUID ${uuid} já cancelada.`);
      }

      const updateData = {
        status: EvaluationApplicationStatus.CANCELED,
      };

      await this.evaluationApplicationRepository.update(evaluationApplication.id, updateData);

      return await this.findOneWithRelations(evaluationApplication.uuid, accountId); 

    } catch (err) {
      if (err instanceof NotFoundException || err instanceof ConflictException) {
        throw err;
      }

      console.error('Erro ao cancelar Aplicação de Avaliação:', err);
      throw new InternalServerErrorException('Falha ao concluir cancelamento da aplicação de avaliação.');
    }
  }

  /**
   * Envia uma aplicação de avaliação, por Email e/ou Notificacção pelo Sistema.
   */
  async send(
    uuid: string,
    payloadDto: SendEvaluationApplicationDto,
    accountId: number
  ): Promise<EvaluationApplication> {
    try {
      const evaluationApplication = await this.evaluationApplicationRepository.findOne({
        where: { uuid, account_id: accountId },
        relations: ['submittingUser', 'evaluatedUser']
      });

      if (!evaluationApplication) {
        throw new NotFoundException(`Application com UUID ${uuid} não encontrada.`);
      }

      const invalidStatusMessages: Record<string, string> = {
        [EvaluationApplicationStatus.FINISHED]: `Aplicação com UUID ${uuid} não pode ser enviada pois já foi finalizada.`,
        [EvaluationApplicationStatus.CANCELED]: `Aplicação com UUID ${uuid} não pode ser enviada pois foi cancelada.`,
        [EvaluationApplicationStatus.EXPIRED]: `Aplicação com UUID ${uuid} não pode ser enviada pois expirou.`,
        [EvaluationApplicationStatus.ACCESSED]: `Aplicação com UUID ${uuid} não pode ser enviada pois já foi acessada.`,
        [EvaluationApplicationStatus.IN_PROGRESS]: `Aplicação com UUID ${uuid} não pode ser enviada pois já está em progresso.`,
      };

      if (invalidStatusMessages[evaluationApplication.status]) {
        throw new ConflictException(invalidStatusMessages[evaluationApplication.status]);
      }

      if (evaluationApplication.status === EvaluationApplicationStatus.CREATED) {
        const now = new Date();
        const newStatus = EvaluationApplicationStatus.SENDED;

        await this.evaluationApplicationRepository.update(evaluationApplication.id, {
          started_date: now,
          status: newStatus
        });

        evaluationApplication.started_date = now;
        evaluationApplication.status = newStatus;
      }

      if (payloadDto.forEmail) {
        // TODO: Chamar MailerService aqui no futuro
        // console.log(`Enviando email para: ${evaluationApplication.submittingUser.email}`);
      }

      if (payloadDto.forSystem) {
        const templateKey = NotificationTemplateKey[`EVALUATION_APPLICATION_${evaluationApplication.type}`];
        await this.notificationsService.create({
          account_id: accountId,
          user_id: evaluationApplication.submitting_user_id,
          template_key: templateKey,
          category: NotificationCategory.INFO,
          evaluation_application_id: evaluationApplication.id,
          sent_for_system_at: new Date(),
        });
      }

      return evaluationApplication;

    } catch (err) {
      if (err instanceof NotFoundException || err instanceof ConflictException) {
        throw err;
      }

      console.error('Erro ao enviar Aplicação de Avaliação:', err);
      throw new InternalServerErrorException('Falha ao concluir envio da aplicação de avaliação.');
    }
  }

  async findWithFiltersMetrics(
    filters: EvaluationApplicationFilterDto,
    accountId: number,
  ): Promise<EvaluationApplication[]> {
    const { 
      name, 
      type, 
      evaluated_user_uuid, 
      submitted_user_uuid, 
      start_date, 
      end_date 
    } = filters;
  
    const query = this.evaluationApplicationRepository.createQueryBuilder('entity')
      .leftJoinAndSelect('entity.evaluation', 'evaluation')
      .leftJoinAndSelect('entity.evaluatedUser', 'evaluatedUser')
      .leftJoinAndSelect('entity.submittingUser', 'submittingUser')
      .leftJoinAndSelect('entity.formApplication', 'formApplication')
      .leftJoinAndSelect('entity.responses', 'formResponses')
      .leftJoinAndSelect('formResponses.answers', 'answers')
      .leftJoinAndSelect('answers.applicationQuestion', 'question')
      .leftJoinAndSelect('question.topic', 'applicationTopic')
      .leftJoinAndSelect('applicationTopic.baseFormTopic', 'topic')
      .leftJoinAndSelect('answers.applicationOption', 'option')
      .leftJoinAndSelect('answers.multiOptions', 'multiOptions')
      .where('entity.account_id = :accountId', { accountId })
      .andWhere('entity.status = :statusFinished', { statusFinished: EvaluationApplicationStatus.FINISHED });

    if (name) {
      query.andWhere('(entity.name ILIKE :name OR evaluation.name ILIKE :name)', { name: `%${name}%` });
    }

    if (type) {
      query.andWhere('entity.type = :type', { type });
    }

    if (evaluated_user_uuid) {
      query.andWhere('evaluatedUser.uuid = :evaluatedUuid', { evaluatedUuid: evaluated_user_uuid });
    }

    if (submitted_user_uuid) {
      query.andWhere('submittingUser.uuid = :submittingUuid', { submittingUuid: submitted_user_uuid });
    }

    if (start_date && end_date) {
      const start = new Date(start_date);
      start.setHours(0, 0, 0, 0);
      const end = new Date(end_date);
      end.setHours(23, 59, 59, 999);
      query.andWhere('entity.created_at BETWEEN :start AND :end', { start, end });
    } else if (start_date) {
      const start = new Date(start_date);
      start.setHours(0, 0, 0, 0);
      query.andWhere('entity.created_at >= :start', { start });
    } else if (end_date) {
      const end = new Date(end_date);
      end.setHours(23, 59, 59, 999);
      query.andWhere('entity.created_at <= :end', { end });
    }

    query.orderBy('entity.created_at', 'DESC');

    return await query.getMany();
  }

  async findDistinctEvaluatedUserIdsByAccountId(accountId: number): Promise<number[]> {
    const results = await this.evaluationApplicationRepository
      .createQueryBuilder('ea')
      .select('DISTINCT ea.evaluated_user_id', 'user_id')
      .where('ea.account_id = :accountId', { accountId })
      .getRawMany();
    
    return results.map((row) => row.user_id);
  }

  /**
   * Retorna aplicações já enviadas (SENDED, ACCESSED, IN_PROGRESS) agrupadas por avaliador (submitting_user),
   * com as aplicações pendentes de resposta e a data limite de cada uma.
   */
  async findPendingByEvaluator(
    accountId: number,
  ): Promise<Array<{ evaluator: User; pending_applications: EvaluationApplication[] }>> {
    const pendingStatuses = [
      EvaluationApplicationStatus.SENDED,
      EvaluationApplicationStatus.ACCESSED,
      EvaluationApplicationStatus.IN_PROGRESS,
    ];

    const applications = await this.evaluationApplicationRepository.find({
      where: {
        account_id: accountId,
        status: In(pendingStatuses),
      },
      relations: [
        'submittingUser',
        'submittingUser.jobPosition',
        'evaluatedUser',
        'evaluatedUser.jobPosition',
      ],
      order: {
        expiration_date: 'ASC',
      },
    });

    const byEvaluatorId = new Map<number, { evaluator: User; pending_applications: EvaluationApplication[] }>();
    for (const app of applications) {
      const evaluator = app.submittingUser;
      if (!evaluator) continue;
      if (!byEvaluatorId.has(evaluator.id)) {
        byEvaluatorId.set(evaluator.id, { evaluator, pending_applications: [] });
      }
      byEvaluatorId.get(evaluator.id).pending_applications.push(app);
    }

    return Array.from(byEvaluatorId.values()).sort((a, b) =>
      (a.evaluator.name || '').localeCompare(b.evaluator.name || ''),
    );
  }

  async totalsEvaluationApplications(accountId: number): Promise<{
    total: number;
    completed: number;
    pending: number;
    expired: number;
  }> {
    // Total de todas as aplicações de avaliação para essa conta
    const total = await this.evaluationApplicationRepository.count({
      where: { account_id: accountId },
    });

    // Aplicações com status FINISHED
    const completed = await this.evaluationApplicationRepository.count({
      where: {
        account_id: accountId,
        status: EvaluationApplicationStatus.FINISHED,
      },
    });

    // Aplicações com status EXPIRED
    const expired = await this.evaluationApplicationRepository.count({
      where: {
        account_id: accountId,
        status: EvaluationApplicationStatus.EXPIRED,
      },
    });

    // Aplicações com status diferente de CANCELED, EXPIRED, FINISHED
    // (ou seja, CREATED, SENDED, ACCESSED, IN_PROGRESS)
    const pending = await this.evaluationApplicationRepository
      .createQueryBuilder('ea')
      .where('ea.account_id = :accountId', { accountId })
      .andWhere('ea.status NOT IN (:...statuses)', {
        statuses: [
          EvaluationApplicationStatus.CANCELED,
          EvaluationApplicationStatus.EXPIRED,
          EvaluationApplicationStatus.FINISHED,
        ],
      })
      .getCount();

    return {
      total,
      completed,
      pending,
      expired,
    };
  }

  async getChartData(accountId: number): Promise<Array<{
    month: string;
    completed_evaluations_count: number;
    average_rate_percentage: number;
  }>> {
    // Calcular data de 12 meses atrás
    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);
    twelveMonthsAgo.setDate(1);
    twelveMonthsAgo.setHours(0, 0, 0, 0);

    // Buscar avaliações finalizadas dos últimos 12 meses
    // Calcular média das respostas do tipo RATE convertidas para porcentagem
    // JOIN: EvaluationApplication -> FormResponse -> FormAnswer -> FormApplicationQuestion
    const results = await this.evaluationApplicationRepository
      .createQueryBuilder('ea')
      .innerJoin('ea.evaluation', 'evaluation')
      .innerJoin('ea.responses', 'fr')
      .innerJoin('fr.answers', 'fa')
      .innerJoin('fa.applicationQuestion', 'faq')
      .select('DATE_FORMAT(ea.finished_at, "%Y-%m")', 'month')
      .addSelect('COUNT(DISTINCT ea.id)', 'completed_evaluations_count')
      .addSelect('AVG((fa.number_value / evaluation.rate) * 100)', 'average_rate_percentage')
      .where('ea.account_id = :accountId', { accountId })
      .andWhere('ea.status = :status', { status: EvaluationApplicationStatus.FINISHED })
      .andWhere('ea.finished_at IS NOT NULL')
      .andWhere('ea.finished_at >= :twelveMonthsAgo', { twelveMonthsAgo })
      .andWhere('faq.type = :rateType', { rateType: QuestionType.RATE })
      .andWhere('fa.number_value IS NOT NULL')
      .andWhere('evaluation.rate > 0') // Evitar divisão por zero
      .groupBy('month')
      .orderBy('month', 'ASC')
      .getRawMany();

    // Criar mapa com os resultados
    const dataMap = new Map<string, { count: number; ratePercentage: number }>();
    results.forEach((row) => {
      dataMap.set(row.month, {
        count: parseInt(row.completed_evaluations_count, 10),
        ratePercentage: parseFloat(row.average_rate_percentage) || 0,
      });
    });

    // Gerar array com todos os meses dos últimos 12 meses
    const chartData: Array<{
      month: string;
      completed_evaluations_count: number;
      average_rate_percentage: number;
    }> = [];

    const currentDate = new Date();
    for (let i = 11; i >= 0; i--) {
      const date = new Date(currentDate);
      date.setMonth(date.getMonth() - i);
      date.setDate(1);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      const monthData = dataMap.get(monthKey);
      chartData.push({
        month: monthKey,
        completed_evaluations_count: monthData?.count || 0,
        average_rate_percentage: monthData?.ratePercentage || 0,
      });
    }

    return chartData;
  }

  /**
   * Ranking dos usuários mais bem avaliados: média das respostas RATE em porcentagem (0-100),
   * agrupados em quartis (top 25%, segundo 25%, terceiro 25%, último 25%).
   */
  async getRankingByQuartiles(
    accountId: number,
  ): Promise<Array<{ quartile: QuartileLabel; users: Array<{ user: User; average_rate_percentage: number }> }>> {
    const raw = await this.evaluationApplicationRepository
      .createQueryBuilder('ea')
      .innerJoin('ea.evaluation', 'e')
      .innerJoin('ea.responses', 'fr')
      .innerJoin('fr.answers', 'fa')
      .innerJoin('fa.applicationQuestion', 'faq')
      .select('ea.evaluated_user_id', 'evaluated_user_id')
      .addSelect('AVG((fa.number_value / e.rate) * 100)', 'avg_percentage')
      .where('ea.account_id = :accountId', { accountId })
      .andWhere('ea.status = :status', { status: EvaluationApplicationStatus.FINISHED })
      .andWhere('fr.is_completed = true')
      .andWhere('faq.type = :rateType', { rateType: QuestionType.RATE })
      .andWhere('fa.number_value IS NOT NULL')
      .andWhere('e.rate > 0')
      .groupBy('ea.evaluated_user_id')
      .orderBy('avg_percentage', 'DESC')
      .getRawMany<{ evaluated_user_id: number; avg_percentage: string }>();

    if (raw.length === 0) {
      return [
        { quartile: 'top_25', users: [] },
        { quartile: 'second_25', users: [] },
        { quartile: 'third_25', users: [] },
        { quartile: 'bottom_25', users: [] },
      ];
    }

    const userIds = raw.map((r) => r.evaluated_user_id);
    const users = await this.usersService.findByIdsAndAccountId(userIds, accountId);
    const userMap = new Map(users.map((u) => [u.id, u]));

    const sorted: Array<{ user: User; average_rate_percentage: number }> = [];
    for (const row of raw) {
      const user = userMap.get(row.evaluated_user_id);
      if (user) {
        sorted.push({
          user,
          average_rate_percentage: parseFloat(row.avg_percentage) || 0,
        });
      }
    }

    const n = sorted.length;
    const q1 = Math.ceil(n * 0.25);
    const q2 = Math.ceil(n * 0.5);
    const q3 = Math.ceil(n * 0.75);
    const quartiles: QuartileLabel[] = ['top_25', 'second_25', 'third_25', 'bottom_25'];
    const ranges: [number, number][] = [[0, q1], [q1, q2], [q2, q3], [q3, n]];

    return ranges.map(([start, end], i) => ({
      quartile: quartiles[i],
      users: sorted.slice(start, end),
    }));
  }
}
