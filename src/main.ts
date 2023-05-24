import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config as envConfig } from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

process.on('unhandledRejection', (error) => {
  console.error('Unhandled promise rejection:', error);
});

envConfig();
bootstrap();
