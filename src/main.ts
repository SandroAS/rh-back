import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import AppDataSource from './data-source';
import { runSeeders } from './seeds/run-seeders';
import { ProfileImageUrlInterceptor } from './interceptors/profile-image-url.interceptor';

async function bootstrap() {
  console.log('Envirement: ', process.env.NODE_ENV);

  await AppDataSource.initialize();
  console.log('Database connected.');

  await AppDataSource.runMigrations();
  console.log('Migrations executed.');

  await runSeeders();

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:8081'],
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  app.setGlobalPrefix('api');

  // Interceptor para processar URLs de imagens de perfil DEPOIS da serialização
  // A ordem importa: primeiro serializa, depois processa as URLs
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalInterceptors(new ProfileImageUrlInterceptor());

  await app.listen(3000);
  console.log('Application is running on http://localhost:3000');
}

bootstrap();
