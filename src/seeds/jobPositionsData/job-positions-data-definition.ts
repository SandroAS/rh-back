import { MetricPrefix, MetricType } from '@/entities/drd-metric.entity';
import techRecuiterSeed from './tech-recuiter.seed';
import assistenteDepartamentoPessoalSeed from './assistente-departamento-pessoal.seed';
import coordenadorRhSeed from './coordenador-rh.seed';
import analistaFinanceiroSeed from './analista-financeiro.seed';
import assistenteComplianceSeed from './assistente-compliance.seed';
import assistenteFinanceiroSeed from './assistente-financeiro.seed';
import gerenteFinanceiroSeed from './gerente-financeiro.seed';
import assistenteCobrancasSeed from './assistente-cobrancas.seed';
import analistaMarketingDigitalSeed from './analista-marketing-digital.seed';
import coordenadorMarketingSeed from './coordenador-marketing.seed';
import diretorCriacaoSeed from './diretor-criacao.seed';
import gestorTrafegoSeed from './gestor-trafego.seed';
import videomakerSeed from './videomaker.seed';
import cmoSeed from './cmo.seed';
import analistaAtendimentoReembolsoSeed from './analista-atendimento-reembolso.seed';
import customerSuccessSeed from './customer-success.seed';
import supervisorAtendimentoClienteSeed from './supervisor-atendimento-cliente.seed';
import suporteTecnicoSeed from './suporte-tecnico.seed';
import assistenteAdministrativoSeed from './assistente-administrativo.seed';
import gerenteAdministrativoSeed from './gerente-administrativo.seed';
import auxiliarLimpezaSeed from './auxiliar-limpeza.seed';
import secretarioExecutivoSeed from './secretario-executivo.seed';
import sdrSeed from './sdr.seed';
import supervisorComercialSeed from './supervisor-comercial.seed';
import consultorComercialSeed from './consultor-comercial.seed';
import dataAnalystSeed from './data-analyst.seed';
import teamLeaderSeed from './team-leader.seed';
import devopsSeed from './devops.seed';
import softwareEngineerSeed from './software-engineer.seed';
import leadSoftwareEngineerSeed from './lead-software-engineer.seed';
import techLeadSeed from './tech-lead.seed';
import qualityAssuranceAnalystSeed from './quality-assurance-analyst.seed';
import productOwnerSeed from './product-owner.seed';
import softwareArchitectSeed from './software-architect.seed';
import uxAnalystSeed from './ux-analyst.seed';
import uxLeadSeed from './ux-lead.seed';
import developerSeed from './developer.seed';
import analistaOperacoesComercialSeed from './analista-operacoes-comercial.seed';
import analistaProcessosSeed from './analista-processos.seed';
import analistaDadosSeed from './analista-dados.seed';

export const jobPositionDefinitions = [
  techRecuiterSeed,
  assistenteDepartamentoPessoalSeed,
  coordenadorRhSeed,
  analistaFinanceiroSeed,
  assistenteComplianceSeed,
  assistenteFinanceiroSeed,
  gerenteFinanceiroSeed,
  assistenteCobrancasSeed,
  analistaMarketingDigitalSeed,
  coordenadorMarketingSeed,
  diretorCriacaoSeed,
  gestorTrafegoSeed,
  videomakerSeed,
  cmoSeed,
  analistaAtendimentoReembolsoSeed,
  customerSuccessSeed,
  supervisorAtendimentoClienteSeed,
  suporteTecnicoSeed,
  assistenteAdministrativoSeed,
  gerenteAdministrativoSeed,
  auxiliarLimpezaSeed,
  secretarioExecutivoSeed,
  sdrSeed,
  supervisorComercialSeed,
  consultorComercialSeed,
  dataAnalystSeed,
  teamLeaderSeed,
  devopsSeed,
  softwareEngineerSeed,
  leadSoftwareEngineerSeed,
  techLeadSeed,
  qualityAssuranceAnalystSeed,
  productOwnerSeed,
  softwareArchitectSeed,
  uxAnalystSeed,
  uxLeadSeed,
  developerSeed,
  analistaOperacoesComercialSeed,
  analistaProcessosSeed,
  analistaDadosSeed,
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
