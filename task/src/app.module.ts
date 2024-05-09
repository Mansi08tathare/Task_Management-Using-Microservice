// service-a/src/app.module.ts

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'TASK_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3002, // Assuming Service A runs on port 3002
        },
      },
    ]),
  ],
  controllers: [AppController],
})
export class AppModule {}
