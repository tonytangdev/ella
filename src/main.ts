import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { NestConfig } from './common/config/config.interface';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const config = app.get(ConfigService);
  const nestConfig = config.get<NestConfig>('nest');

  await app.listen(nestConfig.port);
}
bootstrap();
