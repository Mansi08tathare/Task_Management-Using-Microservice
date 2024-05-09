// service-a/src/main.ts

import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
//import * as dotenv from 'dotenv';

async function bootstrap() {
  //dotenv.config(); 
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 3002, // Assuming Service A runs on port 3002
    },
  });
  await app.listen();
}

bootstrap();
