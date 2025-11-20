import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, FindOneOptions, Repository } from 'typeorm';
import { Evaluation } from '@/entities/evaluation.entity'; 
import { BaseService, PaginationResult } from '@/common/services/base.service';
import { CreateEvaluationDto } from './dtos/create-evaluation.dto';
import { UpdateEvaluationDto } from './dtos/update-evaluation.dto';
import { PaginationDto } from '@/common/dtos/pagination.dto';
import { FormsService } from '../forms/forms.service';
import { DrdsService } from '../drds/drds.service';
import { Form } from '@/entities/form.entity';
import { DRD } from '@/entities/drd.entity';
import { User } from '@/entities/user.entity';

@Injectable()
export class EvaluationsService extends BaseService<Evaluation> {
  constructor(
    @InjectRepository(Evaluation)
    private evaluationRepository: Repository<Evaluation>,
    private dataSource: DataSource,
    private formsService: FormsService,
    private drdsService: DrdsService,
  ) {
    super(evaluationRepository);
  }

  async createByAccountId(
    createEvaluationDto: CreateEvaluationDto,
    accountId: number,
    createdByUser: User,
  ): Promise<Evaluation> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    let drd: DRD = null;
    let createdForm: Form;

    try {
      if (createEvaluationDto.drd_uuid) {
        drd = await this.drdsService.findOneByUuid(createEvaluationDto.drd_uuid, accountId);
        if (!drd) {
          throw new NotFoundException(`DRD com UUID ${createEvaluationDto.drd_uuid} não encontrado.`);
        }
      }

      createdForm = await this.formsService.createInTransaction(
        createEvaluationDto.form,
        queryRunner.manager
      );

      const newEvaluationData = this.evaluationRepository.create({
        ...createEvaluationDto,
        account_id: accountId,
        created_by_user_id: createdByUser.id,
        form: createdForm,
        drd_id: drd ? drd.id : null,
      });

      const savedEvaluation = await queryRunner.manager.save(Evaluation, newEvaluationData);

      await queryRunner.commitTransaction();

      savedEvaluation.form = createdForm;
      savedEvaluation.drd = drd;
      savedEvaluation.createdBy = createdByUser;
      
      return savedEvaluation;

    } catch (err) {
      await queryRunner.rollbackTransaction();

      if (err instanceof NotFoundException || err instanceof ConflictException) {
        throw err;
      }
      
      console.error('Erro ao criar Evaluation:', err);
      throw new InternalServerErrorException('Falha ao salvar o modelo de avaliação. Erro: '+err);
    } finally {
      await queryRunner.release();
    }
  }

  async findAndPaginateByAccountId(
    pagination: PaginationDto, 
    accountId: number, 
    searchColumns: string[] = ['name']
  ): Promise<PaginationResult<Evaluation>> {
    return super.findAndPaginate(pagination, searchColumns, (qb) => {
      qb.andWhere('entity.account_id = :accountId', { accountId });
      qb.leftJoinAndSelect('entity.createdBy', 'createdBy');
      qb.leftJoinAndSelect('entity.drd', 'drd');
      qb.leftJoinAndSelect('drd.jobPosition', 'jobPosition');
      qb.select([
        'entity.id',
        'entity.uuid',
        'entity.name',
        'entity.rate',
        'entity.created_at',
        'createdBy.uuid',
        'createdBy.name',
        'createdBy.email',
        'createdBy.profile_img_url',
        'drd.uuid',
        'drd.jobPosition',
        'jobPosition.uuid',
        'jobPosition.title'
      ]);
    });
  }

  async findAllWithAccountId(accountId: number): Promise<Evaluation[]> {
    return await super.findAll({ where: { account_id: accountId }, relations: ['drd'] });
  }

  async findOneWithRelations(uuid: string, account_id: number): Promise<Evaluation> {
    const qb = this.evaluationRepository.createQueryBuilder('evaluation')
      .where('evaluation.uuid = :uuid', { uuid })
      .andWhere('evaluation.account_id = :accountId', { accountId: account_id })
      .leftJoinAndSelect('evaluation.createdBy', 'createdBy')
      .leftJoinAndSelect('evaluation.drd', 'drd')
      .leftJoinAndSelect('drd.jobPosition', 'jobPosition')
      .leftJoinAndSelect('evaluation.form', 'form')
      .leftJoinAndSelect('form.topics', 'topics')
      .leftJoinAndSelect('topics.questions', 'questions')
      .leftJoinAndSelect('topics.drdTopic', 'drdTopic')
      .leftJoinAndSelect('questions.options', 'options')
      .leftJoinAndSelect('questions.drdTopicItem', 'drdTopicItem')
      .select([
        'evaluation',
        'createdBy',
        'drd',
        'jobPosition.uuid',
        'jobPosition.title',
        'form',
        'topics.uuid',
        'topics.title',
        'topics.description',
        'topics.order',
        'topics.form_id',
        'drdTopic.uuid',
        'questions.uuid',
        'questions.title',
        'questions.description',
        'questions.type',
        'questions.order',
        'questions.is_required',
        'options.uuid',
        'options.text',
        'drdTopicItem.uuid'
      ])

    const evaluation = await qb.getOne();

    if (!evaluation) {
      throw new NotFoundException(`Evaluation with UUID ${uuid} not found, or related form data (questions/options) is missing.`);
    }

    return evaluation;
  }

  async updateWithAccountId(
    uuid: string, 
    updateEvaluationDto: UpdateEvaluationDto, 
    accountId: number, 
  ): Promise<Evaluation> {
      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      try {
        const existingEvaluation = await this.evaluationRepository.findOne({
          where: { uuid, account_id: accountId },
          relations: ['createdBy', 'form', 'drd', 'form.topics', 'form.topics.questions', 'form.formQuestions'], 
        });

        if (!existingEvaluation) {
          throw new NotFoundException(`Modelo de avaliação com UUID ${uuid} não encontrado.`);
        }

        let drd: DRD | null = existingEvaluation.drd;

        if (updateEvaluationDto.drd_uuid !== undefined) {
          if (updateEvaluationDto.drd_uuid) {
            drd = await this.drdsService.findOneByUuid(updateEvaluationDto.drd_uuid, accountId);
            if (!drd) {
              throw new NotFoundException(`DRD com UUID ${updateEvaluationDto.drd_uuid} não encontrado.`);
            }
          } else {
            drd = null;
          }
        }

        const evaluationUpdateData = {
          name: updateEvaluationDto.name,
          description: updateEvaluationDto.description,
          rate: updateEvaluationDto.rate,
          drd_id: drd ? drd.id : null,
          updated_by_user_id: 1,
        };

        this.evaluationRepository.merge(existingEvaluation, evaluationUpdateData);
        const updatedEvaluation = await queryRunner.manager.save(Evaluation, existingEvaluation);

        if (updateEvaluationDto.form) {
          const updatedForm = await this.formsService.syncFormStructureInTransaction(
            existingEvaluation.form.uuid,
            updateEvaluationDto.form,
            queryRunner.manager
          );
          updatedEvaluation.form = updatedForm;
        }

        await queryRunner.commitTransaction();

        updatedEvaluation.drd = drd;

        return updatedEvaluation;

      } catch (err) {
        await queryRunner.rollbackTransaction();

        if (err instanceof NotFoundException || err instanceof ConflictException) {
          throw err;
        }

        console.error('Erro ao atualizar Evaluation:', err);
        throw new InternalServerErrorException('Falha ao concluir a atualização do modelo de avaliação.');
      } finally {
        await queryRunner.release();
      }
  }
}
