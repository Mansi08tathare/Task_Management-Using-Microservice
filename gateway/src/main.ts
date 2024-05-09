// gateway/src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(server),
  );
  await app.init();
  return server;
}

bootstrap()
  .then(server => {
    server.listen(3000, () => console.log('Gateway is running on http://localhost:3000'));
  })
  .catch(err => console.error('Gateway initialization failed', err));
