import { Injectable, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { FormResponse } from '@/entities/form-response.entity';
import { EvaluationApplication, EvaluationApplicationStatus } from '@/entities/evaluation-application.entity';
import { CreateFormResponseDto } from './dtos/create-form-response.dto';
import { EvaluationApplicationsService } from '../evaluation-applications/evaluation-applications.service';
import { FormAnswersService } from '../form-answers/form-answers.service';

@Injectable()
export class FormResponsesService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly evaluationApplicationsService: EvaluationApplicationsService,
    private readonly formAnswersService: FormAnswersService,
  ) {}

  async submitResponse(
    evaluationApplicationUuid: string, 
    payload: CreateFormResponseDto, 
    userId: number
  ): Promise<FormResponse> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const evaluationApp = await this.evaluationApplicationsService.findByUuidWithFormRelations(
        evaluationApplicationUuid,
        queryRunner.manager
      );

      if (!evaluationApp) {
        throw new NotFoundException('Aplicação de avaliação não encontrada.');
      }

      if (evaluationApp.status === EvaluationApplicationStatus.FINISHED) {
        throw new ConflictException('Esta avaliação já foi finalizada.');
      }

      const formApplication = evaluationApp.formApplication;
      if (!formApplication) {
        throw new NotFoundException('Formulário vinculado à aplicação não encontrado.');
      }

      const formResponse = queryRunner.manager.create(FormResponse, {
        form_application_id: formApplication.id,
        evaluation_application_id: evaluationApp.id,
        user_id: userId,
        is_completed: payload.is_completed ?? true,
        submitted_at: new Date(),
      });

      const savedResponse = await queryRunner.manager.save(FormResponse, formResponse);

      const availableQuestions = formApplication.applicationTopics.flatMap(t => t.questions);

      for (const answerDto of payload.answers) {
        const question = availableQuestions.find(
          q => q.uuid === answerDto.application_question_uuid
        );

        if (!question) {
          throw new NotFoundException('Questão não encontrada no formulário.');
        }

        await this.formAnswersService.createInTransaction(
          savedResponse.id,
          question,
          answerDto,
          queryRunner.manager
        );
      }

      await queryRunner.manager.update(EvaluationApplication, evaluationApp.id, {
        status: EvaluationApplicationStatus.FINISHED,
        finished_at: new Date(),
      });

      await queryRunner.commitTransaction();
      return savedResponse;

    } catch (err) {
      await queryRunner.rollbackTransaction();

      if (err instanceof NotFoundException || err instanceof ConflictException) {
        throw err;
      }

      console.error('Erro ao processar submissão de formulário:', err);
      throw new InternalServerErrorException('Falha ao concluir o envio das respostas.');
    } finally {
      await queryRunner.release();
    }
  }

  async findDistinctEvaluatedUserIdsWithCompletedResponsesByAccountId(accountId: number): Promise<number[]> {
    const results = await this.dataSource
      .getRepository(FormResponse)
      .createQueryBuilder('fr')
      .innerJoin('evaluation_applications', 'ea', 'ea.id = fr.evaluation_application_id')
      .where('ea.account_id = :accountId', { accountId })
      .andWhere('fr.is_completed = true')
      .select('DISTINCT ea.evaluated_user_id', 'user_id')
      .getRawMany();
    
    return results.map((row) => row.user_id);
  }
}
