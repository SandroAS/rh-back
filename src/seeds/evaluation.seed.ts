import { Injectable, Logger } from '@nestjs/common';
import { DrdsService } from '@/modules/drds/drds.service';
import { EvaluationsService } from '../modules/evaluations/evaluations.service';
import { User } from '@/entities/user.entity';
import { QuestionType } from '@/common/enums/question-type.enum';
import { jobPositionDefinitions } from './jobPositionsData/job-positions-data-definition';

@Injectable()
export class EvaluationSeeder {
  private readonly logger = new Logger(EvaluationSeeder.name);

  constructor(
    private readonly evaluationsService: EvaluationsService,
    private readonly drdsService: DrdsService,
  ) {}

  async run(accountId: number, adminUser: User) {
    this.logger.log(`Iniciando geração de avaliações para a conta ID: ${accountId}...`);

    try {
      const drds = await this.drdsService.findAllWithRelations(accountId);

      if (!drds || drds.length === 0) {
        this.logger.warn(`Nenhum DRD encontrado para a conta ${accountId}.`);
        return;
      }

      for (const drd of drds) {
        const jobTitle = drd.jobPosition?.title;
        this.logger.log(`Gerando avaliação para: ${jobTitle}`);

        const jobDef = jobPositionDefinitions.find(d => d.title === jobTitle);

        const createEvaluationDto = {
          name: `Avaliação de Desempenho - ${jobTitle}`,
          description: `Modelo automático baseado no DRD de ${jobTitle}.`,
          rate: 5,
          drd_uuid: drd.uuid,
          created_by_user_uuid: adminUser.uuid,
          form: {
            name: `Formulário: ${jobTitle}`,
            description: 'Avalie o nível de entrega para cada competência.',
            topics: drd.topics?.map((topic) => {
              const topicDef = jobDef?.topics.find(t => t.name === topic.name);

              return {
                title: topic.name,
                order: topic.order,
                drd_topic_uuid: topic.uuid,
                questions: topic.drdTopicItems?.map((item) => {
                  const itemDef = topicDef?.drdTopicItems.find(i => i.name === item.name);
                  
                  return {
                    text: item.name,
                    description: itemDef?.description || item.description,
                    type: QuestionType.RATE,
                    order: item.order,
                    is_required: true,
                    drd_topic_item_uuid: item.uuid,
                    options: null,
                  };
                }) || [],
              };
            }) || [],
          },
        };

        await this.evaluationsService.createByAccountId(
          createEvaluationDto as any,
          accountId,
          adminUser,
        );
      }

      this.logger.log(`Sucesso: ${drds.length} avaliações processadas.`);
    } catch (error) {
      this.logger.error(`Erro no EvaluationSeeder: ${error.message}`);
      throw error;
    }
  }
}
