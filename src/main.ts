import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { NestConfig } from './common/config/config.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);
  console.log(config);
  const nestConfig = config.get<NestConfig>('nest');

  await app.listen(nestConfig.port);
}
bootstrap();
