// service-b/src/app.controller.ts
import { Controller, Get, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { UserDTO } from './user.dto';
//import { AuthGuard } from './guards/auth.guard';


@Controller()
export class AppController {
  constructor(private readonly appservice:AppService) {}


// @UseGuards(AuthGuard)
  @MessagePattern({ cmd: 'getData' })
  getData(): string {
    return 'Data from Service B';
  }

  //@UseGuards(AuthGuard)
  @MessagePattern({ cmd: 'getUser' })
  getUser(): string {
    return 'From User Service';
  }

  //health 
  @MessagePattern({ "cmd": 'user_microservice' })
  healthCheck(): { success: boolean } {
    console.log("User microservice is online")
    return { success: true }
  }

//   @MessagePattern({ cmd: 'register' }) 
//   async register(userDto: { username: string, password: string ,id:Number,role:String}) {
//   try {
//     console.log("user",userDto)
//     return await this.appservice.register(userDto); 
//   } catch (error) {
//     throw new HttpException('Failed to create user', HttpStatus.INTERNAL_SERVER_ERROR);
//   }
// }

// @MessagePattern({ cmd: 'login' })

// async login(data: { username: string; password: string }) {
//   console.log("data",data)
//   return await this.appservice.login(data);
// }

@MessagePattern({ cmd: 'register' })
async register(userDto: UserDTO) { // Use UserDTO here
  try {
    console.log("user", userDto);
    return await this.appservice.register(userDto);
  } catch (error) {
    throw new HttpException('Failed to create user', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

@MessagePattern({ cmd: 'login' })
async login(data: { username: string; password: string }) {
  console.log("data", data);
  return await this.appservice.login(data);
}
}
