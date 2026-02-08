import { MinioService } from './minio.service';

/**
 * Contexto global para armazenar a instância do MinioService
 * Isso permite que DTOs e transformers acessem o serviço sem injeção de dependência
 */
class MinioContext {
  private static instance: MinioService | null = null;

  static setMinioService(service: MinioService): void {
    MinioContext.instance = service;
  }

  static getMinioService(): MinioService | null {
    return MinioContext.instance;
  }

  static hasMinioService(): boolean {
    return MinioContext.instance !== null;
  }
}

export default MinioContext;
