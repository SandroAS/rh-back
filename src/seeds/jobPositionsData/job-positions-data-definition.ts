import { MetricPrefix, MetricType } from '@/entities/drd-metric.entity';
import techRecuiterSeed from './tech-recuiter.seed';
import assistenteDepartamentoPessoalSeed from './assistente-departamento-pessoal.seed';
import coordenadorRhSeed from './coordenador-rh.seed';

export const jobPositionDefinitions = [
  techRecuiterSeed,
  assistenteDepartamentoPessoalSeed,
  coordenadorRhSeed,
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
