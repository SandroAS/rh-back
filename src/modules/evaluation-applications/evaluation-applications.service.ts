import { Injectable, NotFoundException, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, EntityManager } from 'typeorm';
import { EvaluationApplication, EvaluationApplicationStatus, EvaluationType } from '@/entities/evaluation-application.entity';
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

@Injectable()
export class EvaluationApplicationsService extends BaseService<EvaluationApplication> {
  constructor(
    @InjectRepository(EvaluationApplication)
    private readonly evaluationApplicationRepository: Repository<EvaluationApplication>,
    private readonly dataSource: DataSource,
    private readonly formApplicationsService: FormApplicationsService,
    private readonly evaluationsService: EvaluationsService,
    private readonly notificationsService: NotificationsService,
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
}
