// service-a/src/app.controller.ts

import { Controller, Get } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  @MessagePattern({ cmd: 'getData' })
  getData(): string {
    return 'Data from Service A';
  }

  @MessagePattern({ cmd: 'getTask' })
  getTask(): string {
    return 'From Task Service';
  }

   
  //health 
  @MessagePattern({ "cmd": 'task_microservice' })
  healthCheck(): {success: boolean} {
    console.log("Task microservice is online")
    return { success: true }
  }
}
