import { Injectable, NotFoundException, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { EvaluationApplication } from '@/entities/evaluation-application.entity';
import { User } from '@/entities/user.entity';
import { PaginationDto } from '@/common/dtos/pagination.dto';
import { BaseService, PaginationResult } from '@/common/services/base.service';
import { CreateEvaluationApplicationDto } from './dtos/create-evaluation-application.dto';
import { UpdateEvaluationApplicationDto } from './dtos/update-evaluation-application.dto';
import { FormApplicationsService } from '../form-applications/form-applications.service';
import { FormApplication } from '@/entities/form-application.entity';

@Injectable()
export class EvaluationApplicationsService extends BaseService<EvaluationApplication> {
  constructor(
    @InjectRepository(EvaluationApplication)
    private readonly evaluationApplicationRepository: Repository<EvaluationApplication>,
    private readonly dataSource: DataSource,
    private readonly formApplicationsService: FormApplicationsService,
  ) {
    super(evaluationApplicationRepository);
  }

  /**
   * Cria uma nova aplicação de avaliação em transação (CREATE).
   */
  async createByAccountId(
    payload: CreateEvaluationApplicationDto,
    accountId: number,
    user: User,
  ): Promise<EvaluationApplication> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const newApplication = this.evaluationApplicationRepository.create({
        ...payload,
        account_id: accountId
      });

      const createdApplication = await queryRunner.manager.save(EvaluationApplication, newApplication);

      let createdFormApplication: FormApplication | null = null;
      if (payload.form_uuid) {
        createdFormApplication = await this.formApplicationsService.createInTransaction(
          payload.form_uuid, 
          accountId, 
          createdApplication.id,
          queryRunner.manager
        );
        createdApplication.formApplication = createdFormApplication;
      }

      await queryRunner.commitTransaction();
      
      return createdApplication;

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
    searchColumns: string[] = ['candidate_name', 'status']
  ): Promise<PaginationResult<EvaluationApplication>> {
    return super.findAndPaginate(pagination, searchColumns, (qb) => {
      qb.andWhere('entity.account_id = :accountId', { accountId });


      qb.leftJoin('entity.evaluation', 'evaluation')
        .leftJoin('evaluation.drd', 'drd')
        .leftJoin('drd.jobPosition', 'jobPosition');
      
      qb.select([
        'entity.uuid',
        'entity.status',
        'entity.candidate_name',
        'entity.created_at',
        'evaluation.uuid',
        'evaluation.name',
        'jobPosition.uuid',
        'jobPosition.title',
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

      .leftJoinAndSelect('application.createdBy', 'createdBy')
      .leftJoinAndSelect('application.evaluation', 'evaluation')
      .leftJoinAndSelect('evaluation.drd', 'drd')
      .leftJoinAndSelect('drd.jobPosition', 'jobPosition')
      .leftJoinAndSelect('application.formApplication', 'formApplication')
      
      .leftJoinAndSelect('formApplication.topics', 'topics')
      .leftJoinAndSelect('topics.questionResponses', 'questionResponses')
      .leftJoinAndSelect('questionResponses.optionsResponses', 'optionsResponses')

      .getOne();

    if (!application) {
      throw new NotFoundException(`Evaluation Application with UUID ${uuid} not found.`);
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
  ) {
  // ): Promise<EvaluationApplication> {
  //   const queryRunner = this.dataSource.createQueryRunner();
  //   await queryRunner.connect();
  //   await queryRunner.startTransaction();

  //   try {
  //     const application = await this.evaluationApplicationRepository.findOne({
  //       where: { uuid, account_id: accountId },
  //       relations: ['formApplication'],
  //     });

  //     if (!application) {
  //       throw new NotFoundException(`Application with UUID ${uuid} não encontrada para atualização.`);
  //     }

  //     const { formApplication: formApplicationPayload, ...restPayload } = payload as any;

  //     if (restPayload.evaluated_user_id && typeof restPayload.evaluated_user_id === 'string') {
  //       restPayload.evaluated_user_id = parseInt(restPayload.evaluated_user_id, 10);
  //     }

  //     this.evaluationApplicationRepository.merge(application, restPayload);
  //     const updatedApplication = await queryRunner.manager.save(EvaluationApplication, application);
      
  //     if (formApplicationPayload && updatedApplication.formApplication && updatedApplication.formApplication.id) {
  //       const formApp = await queryRunner.manager.findOne(FormApplication, { 
  //         where: { id: updatedApplication.formApplicationId },
  //         select: ['uuid']
  //       });

  //       if(formApp) {
  //         const updatedForm = await this.formApplicationsService.updateInTransaction(
  //           formApp.uuid, 
  //           form_application, 
  //           accountId,
  //           queryRunner.manager
  //         );
  //         updatedApplication.formApplication = updatedForm;
  //       }
  //     }

  //     await queryRunner.commitTransaction();

  //     return await this.findOneWithRelations(updatedApplication.uuid, accountId); 

  //   } catch (err) {
  //     await queryRunner.rollbackTransaction();

  //     if (err instanceof NotFoundException || err instanceof ConflictException) {
  //       throw err;
  //     }
      
  //     console.error('Erro ao atualizar Evaluation Application:', err);
  //     throw new InternalServerErrorException('Falha ao concluir a atualização da aplicação de avaliação.');
  //   } finally {
  //     await queryRunner.release();
  //   }
  }
}
