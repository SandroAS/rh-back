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

    // Se for um array, processa cada item
    if (Array.isArray(data)) {
      return Promise.all(data.map(item => this.processProfileImageUrls(item)));
    }

    // Se for um objeto, processa recursivamente
    if (typeof data === 'object' && data !== null) {
      const processed: any = Array.isArray(data) ? [...data] : { ...data };

      // Processa profile_img_url se existir (pode estar no objeto raiz ou em objetos aninhados)
      if (processed.profile_img_url && typeof processed.profile_img_url === 'string') {
        console.log(`[INTERCEPTOR] Processando profile_img_url: ${processed.profile_img_url}`);
        processed.profile_img_url = await this.processProfileImageUrl(processed.profile_img_url);
        console.log(`[INTERCEPTOR] Resultado: ${processed.profile_img_url}`);
      }

      // Processa todos os campos recursivamente
      for (const key in processed) {
        if (processed.hasOwnProperty(key)) {
          const value = processed[key];
          
          // Se for um objeto ou array, processa recursivamente
          if (value && typeof value === 'object') {
            processed[key] = await this.processProfileImageUrls(value);
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
        const processedUrl = await minioService.processProfileImageUrl(profileImgUrl);
        console.log(`[INTERCEPTOR] Processou URL: ${profileImgUrl} -> ${processedUrl}`);
        return processedUrl;
      } catch (error) {
        console.error(`[INTERCEPTOR] Erro ao processar URL da imagem: ${error.message}`);
        return null;
      }
    }

    // Se não houver MinioService disponível, retorna o valor original
    console.log(`[INTERCEPTOR] MinioService não disponível, retornando original: ${profileImgUrl}`);
    return profileImgUrl;
  }
}
