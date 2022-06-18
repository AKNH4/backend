import { ParseUUIDPipe, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf';
import { AppModule } from './app.module';
import { readFileSync } from 'fs';
const helmet = require('helmet');

// const cert = readFileSync('/etc/letsencrypt/live/marasite.de/cert.pem');
// const key = readFileSync('/etc/letsencrypt/live/marasite.de/privkey.pem');
// const ca = readFileSync('/etc/letsencrypt/live/marasite.de/fullchain.pem');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // httpsOptions: {
    //   cert: cert,
    //   key: key,
    //   ca: ca,
    // },
  });

  const PORT = 8080;

  // app.use(csurf())
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.use(helmet());
  app.use(cookieParser());
  app.setGlobalPrefix('api');
  await app.listen(PORT, '0.0.0.0', () =>
    console.log(`Server listening on port ${PORT}`),
  );
}
bootstrap();
