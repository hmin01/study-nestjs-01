import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

const PORT: number = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
  // Logging
  Logger.log(`Application start (port: ${PORT})`);
}
bootstrap();
