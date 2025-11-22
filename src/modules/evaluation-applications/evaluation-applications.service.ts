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
    private readonly applicationRepository: Repository<EvaluationApplication>,
    private readonly dataSource: DataSource,
    private readonly formApplicationsService: FormApplicationsService,
  ) {
    super(applicationRepository);
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
        const { form_application, ...applicationData } = payload;
        
        // 1. Cria e salva a entidade principal EvaluationApplication
        const newApplication = this.applicationRepository.create({
            ...applicationData,
            account_id: accountId,
            created_by_user_uuid: user.uuid,
        });

        const createdApplication = await queryRunner.manager.save(EvaluationApplication, newApplication);

        // 2. Cria e anexa o FormApplication
        let createdFormApplication: FormApplication | null = null;
        if (form_application) {
            createdFormApplication = await this.formApplicationsService.createInTransaction(
                form_application, 
                accountId, 
                createdApplication.id, 
                queryRunner.manager // Passando o manager da transação
            );
            createdApplication.formApplication = createdFormApplication;
        }

        await queryRunner.commitTransaction();

        // Anexar relações básicas para retorno
        createdApplication.createdBy = user;
        
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
    searchColumns: string[] = ['candidate_name', 'status'], // Exemplo de colunas de busca
  ): Promise<PaginationResult<EvaluationApplication>> {
    return super.findAndPaginate(pagination, searchColumns, (qb) => {
        qb.andWhere('entity.account_id = :accountId', { accountId });
        
        // Relações essenciais para a listagem (evaluation e jobPosition)
        qb.leftJoin('entity.evaluation', 'evaluation')
          .leftJoin('evaluation.drd', 'drd')
          .leftJoin('drd.jobPosition', 'jobPosition');
        
        // Seleção de campos para otimização da consulta
        qb.select([
            'entity.uuid',
            'entity.status',
            'entity.candidate_name', // Exemplo de campo de Application
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
  async findAllWithAccountId(accountId: number): Promise<Partial<EvaluationApplication>[]> {
    return await this.applicationRepository.createQueryBuilder('application')
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
    const application = await this.applicationRepository.createQueryBuilder('application')
      .where('application.uuid = :uuid', { uuid })
      .andWhere('application.account_id = :accountId', { accountId })
      
      // Carregar todas as relações
      .leftJoinAndSelect('application.createdBy', 'createdBy')
      .leftJoinAndSelect('application.evaluation', 'evaluation')
      .leftJoinAndSelect('evaluation.drd', 'drd')
      .leftJoinAndSelect('drd.jobPosition', 'jobPosition')
      .leftJoinAndSelect('application.formApplication', 'formApplication')
      
      // Relações do FormApplication para ver as respostas
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
  ): Promise<EvaluationApplication> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
        const application = await this.applicationRepository.findOne({
            where: { uuid, account_id: accountId },
            relations: ['formApplication'], // Necessário para buscar o FormApplication para update
        });

        if (!application) {
            throw new NotFoundException(`Application with UUID ${uuid} não encontrada para atualização.`);
        }

        const { form_application, ...applicationData } = payload;

        // 1. Atualiza a entidade principal
        this.applicationRepository.merge(application, applicationData);
        const updatedApplication = await queryRunner.manager.save(EvaluationApplication, application);
        
        // 2. Atualiza o FormApplication, se fornecido
        if (form_application && updatedApplication.formApplicationId) {
            // Busca o UUID do FormApplication para a função updateInTransaction
            const formApp = await queryRunner.manager.findOne(FormApplication, { 
                where: { id: updatedApplication.formApplicationId },
                select: ['uuid']
            });

            if(formApp) {
                const updatedForm = await this.formApplicationsService.updateInTransaction(
                    formApp.uuid, 
                    form_application, 
                    accountId,
                    queryRunner.manager
                );
                updatedApplication.formApplication = updatedForm;
            }
        }

        await queryRunner.commitTransaction();

        // Busca a aplicação completa para retorno
        return await this.findOneWithRelations(updatedApplication.uuid, accountId); 

    } catch (err) {
      await queryRunner.rollbackTransaction();

      if (err instanceof NotFoundException || err instanceof ConflictException) {
        throw err;
      }
      
      console.error('Erro ao atualizar Evaluation Application:', err);
      throw new InternalServerErrorException('Falha ao concluir a atualização da aplicação de avaliação.');
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * Remove uma aplicação de avaliação em transação (DELETE).
   */
  async removeByUuid(uuid: string, accountId: number): Promise<void> {
    const application = await this.applicationRepository.findOne({ 
      where: { uuid, account_id: accountId } 
    });

    if (!application) {
      throw new NotFoundException(`Evaluation Application with UUID ${uuid} not found.`);
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
        // Remover FormApplication primeiro (se existir)
        if (application.formApplicationId) {
            await this.formApplicationsService.removeByIdInTransaction(
                application.formApplicationId, 
                queryRunner.manager
            );
        }
        
        // Remover EvaluationApplication
        await queryRunner.manager.delete(EvaluationApplication, application.id);

        await queryRunner.commitTransaction();
    } catch (error) {
        await queryRunner.rollbackTransaction();
        console.error('Erro ao remover Evaluation Application em transação:', error);
        throw new InternalServerErrorException('Falha ao remover a aplicação de avaliação.');
    } finally {
        await queryRunner.release();
    }
  }
}