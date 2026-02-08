import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import MinioContext from '@/minio/minio-context';

/**
 * Interceptor que processa automaticamente URLs de imagens de perfil
 * Converte objectNames do MinIO em URLs assinadas antes da serialização
 */
@Injectable()
export class ProfileImageUrlInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    return handler.handle().pipe(
      switchMap(async (data: any) => {
        return await this.processProfileImageUrls(data);
      }),
    );
  }

  /**
   * Processa recursivamente URLs de imagens de perfil em objetos
   */
  private async processProfileImageUrls(data: any): Promise<any> {
    if (!data) {
      return data;
    }

    // Preserva objetos Date, não processa
    if (data instanceof Date) {
      return data;
    }

    // Se for um array, processa cada item
    if (Array.isArray(data)) {
      return Promise.all(data.map(item => this.processProfileImageUrls(item)));
    }

    // Se for um objeto, processa recursivamente
    if (typeof data === 'object' && data !== null) {
      const processed: any = {};

      // Copia todas as propriedades preservando objetos Date
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const value = data[key];
          
          // Preserva objetos Date
          if (value instanceof Date) {
            processed[key] = value;
          }
          // Processa profile_img_url se for string
          else if (key === 'profile_img_url' && typeof value === 'string') {
            processed[key] = await this.processProfileImageUrl(value);
          }
          // Se for um objeto ou array, processa recursivamente
          else if (value && typeof value === 'object') {
            processed[key] = await this.processProfileImageUrls(value);
          }
          // Outros valores primitivos
          else {
            processed[key] = value;
          }
        }
      }

      return processed;
    }

    return data;
  }

  /**
   * Processa uma única URL de imagem de perfil
   */
  private async processProfileImageUrl(profileImgUrl: string): Promise<string | null> {
    if (!profileImgUrl) {
      return null;
    }

    // Se já for uma URL completa, retorna como está
    if (profileImgUrl.includes('http://') || profileImgUrl.includes('https://') || profileImgUrl.includes('googleusercontent')) {
      return profileImgUrl;
    }

    // Se for um objectName do MinIO, processa
    const minioService = MinioContext.getMinioService();
    if (minioService) {
      try {
        return await minioService.processProfileImageUrl(profileImgUrl);
      } catch (error) {
        console.error(`[INTERCEPTOR] Erro ao processar URL da imagem: ${error.message}`);
        return null;
      }
    }

    // Se não houver MinioService disponível, retorna o valor original
    return profileImgUrl;
  }
}
