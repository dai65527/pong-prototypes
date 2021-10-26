import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { Logger } from '@nestjs/common';
import * as csurf from 'csurf';
import { nestCsrf, CsrfFilter } from 'ncsrf';

async function bootstrap() {
  const logger: Logger = new Logger('main.ts');
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  // app.use(csurf);
  app.use(csurf({ cookie: true }));
  // app.use(nestCsrf());
  await app.listen(process.env.SERVER_PORT, () =>
    logger.log(`Server started on port ${process.env.SERVER_PORT}`),
  );
}
bootstrap();
