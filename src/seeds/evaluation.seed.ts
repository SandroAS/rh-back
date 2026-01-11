import { Injectable, Logger } from '@nestjs/common';
import { DrdsService } from '@/modules/drds/drds.service';
import { EvaluationsService } from '../modules/evaluations/evaluations.service';
import { User } from '@/entities/user.entity';
import { QuestionType } from '@/common/enums/question-type.enum';
import { type JobPositionDefinitionDrdTopicItem, jobPositionDefinitions } from './jobPositionsData/job-positions-data-definition';

@Injectable()
export class EvaluationSeeder {
  private readonly logger = new Logger(EvaluationSeeder.name);

  constructor(
    private readonly evaluationsService: EvaluationsService,
    private readonly drdsService: DrdsService,
  ) {}

  /**
   * Executa a criação de avaliações para todos os DRDs de uma conta.
   * @param accountId ID da conta
   * @param adminUser Entidade do usuário que está realizando a operação
   */
  async run(accountId: number, adminUser: User) {
    this.logger.log(`Iniciando geração de avaliações dinâmicas para a conta ID: ${accountId}...`);

    try {
      const drds = await this.drdsService.findAllWithRelations(accountId);

      if (!drds || drds.length === 0) {
        this.logger.warn(`Nenhum DRD encontrado para a conta ${accountId}. O seed de avaliações não será executado.`);
        return;
      }

      for (const drd of drds) {
        this.logger.log(`Gerando modelo de avaliação para: ${drd.jobPosition?.title || 'Cargo Indefinido'}`);

        const createEvaluationDto = {
          name: `Avaliação de Desempenho - ${drd.jobPosition?.title}`,
          description: `Modelo automático gerado a partir das competências técnicas e comportamentais do cargo ${drd.jobPosition?.title}.`,
          rate: 5,
          drd_uuid: drd.uuid,
          created_by_user_uuid: adminUser.uuid,
          form: {
            name: `Formulário de Competências: ${drd.jobPosition?.title}`,
            description: 'Selecione o nível de proficiência para cada critério abaixo.',
            topics: drd.topics?.map((topic) => ({
              title: topic.name,
              order: topic.order,
              drd_topic_uuid: topic.uuid,
              questions: topic.drdTopicItems?.map((item) => {
                const itemDefinition = jobPositionDefinitions.find(definition => {
                  return definition.title === drd.jobPosition?.title
                })?.topics.find(topicDefinition => {
                  return topicDefinition.name === topic.name
                })?.drdTopicItems.find(itemDefinition => {
                  return itemDefinition.name === item.name;
                });
                
                return {
                  text: item.name,
                  description: (itemDefinition as JobPositionDefinitionDrdTopicItem)?.description,
                  type: QuestionType.RATE,
                  order: item.order,
                  is_required: true,
                  drd_topic_item_uuid: item.uuid,
                  options: null,
                };
              }) || [],
            })) || [],
          },
        };

        await this.evaluationsService.createByAccountId(
          createEvaluationDto as any,
          accountId,
          adminUser,
        );
      }

      this.logger.log(`Concluído: ${drds.length} avaliações processadas com sucesso.`);
    } catch (error) {
      this.logger.error(`Falha ao processar EvaluationSeeder: ${error.message}`);
      throw error;
    }
  }
}
