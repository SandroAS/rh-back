import { DRDMetric, MetricPrefix, MetricType } from '@/entities/drd-metric.entity';
import techRecuiterSeed from './tech-recuiter.seed';
import { DRDTopic } from '@/entities/drd-topic.entity';
import { QuestionType } from '@/common/enums/question-type.enum';
// Importe outros conforme criar
// import softwareEngineerSeed from './software-engineer.seed';
// import marketingAnalystSeed from './marketing-analyst.seed';

export const jobPositionDefinitions = [
  techRecuiterSeed,
  // softwareEngineerSeed,
  // marketingAnalystSeed,
];

export interface JobPositionDefinitionMetric {
  name: string;
  classification: string;
  order: number;
  type: MetricType;
  prefix: MetricPrefix;
  scoresByLevel: {
    drd_level_order: number;
    min_score: number;
  }[];
}

export interface JobPositionDefinitionDrdTopicItem {
  name: string;
  description?: string;
  order: number;
  scoresByLevel: {
    drd_level_order: number;
    min_score: number;
  }[];
}

export interface JobPositionDefinitionTopic {
  name: string;
  description?: string;
  order: number;
  drd_topic_uuid?: string;
  drdTopicItems: JobPositionDefinitionDrdTopicItem[];
}

export interface JobPositionDefinition {
  title: string;
  cbo_code: string;
  base_salary: number;
  description: string;
  metrics: JobPositionDefinitionMetric[];
  topics: JobPositionDefinitionTopic[];
}
