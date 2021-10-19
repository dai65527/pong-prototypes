import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger: Logger = new Logger('main.ts');
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  await app.listen(process.env.SERVER_PORT, () =>
    logger.log(`Server started on port ${process.env.SERVER_PORT}`),
  );
}
bootstrap();
