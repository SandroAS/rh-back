import { CommandFactory } from 'nest-commander';
import { AppModule } from './app.module';

async function bootstrap() {
  /**
   * CommandFactory.run() inicializa o Nest sem subir o servidor HTTP,
   * executa o comando encontrado pelo nome e encerra o processo.
   */
  await CommandFactory.run(AppModule, {
    logger: ['error', 'warn'],
  });
}

bootstrap();
