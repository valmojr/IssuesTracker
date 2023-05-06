import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config as envConfig } from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

envConfig();
bootstrap();
