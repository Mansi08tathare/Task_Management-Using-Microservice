// gateway/src/app.controller.ts

import { Body, Controller, Get, HttpException, HttpStatus, Inject, Param, Post, Res, UseGuards } from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AuthService } from './services/login.service';
import { AuthGuard } from './guards/auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    @Inject('USER_SERVICE') private readonly serviceAProxy: ClientProxy,
    @Inject('TASK_SERVICE') private readonly serviceBProxy: ClientProxy,
  ) {}

  @Get('user')
  getDataFromServiceA(): Observable<string> {
    return this.serviceAProxy.send<string>({ cmd: 'getUser' }, "");
  }

  @UseGuards(AuthGuard)
  @Get('task')
  getDataFromServiceB(): Observable<string> {
    return this.serviceBProxy.send<string>({ cmd: 'getTask' }, "");
  }

  @MessagePattern({ cmd: 'getData' })
  getData(@Payload() data: any): Observable<string> {
    if (data.service === 'A') {
      return this.serviceAProxy.send<string>({ cmd: 'getData' }, {});
    } else if (data.service === 'B') {
      return this.serviceBProxy.send<string>({ cmd: 'getData' }, {});
    }
  }


  @Post('register')
  async create(@Body() userDto:{username:string,password:string,id:Number,role:String}, @Res() res: any){
    const {username ,password,id,role}=userDto;
    try{
      console.log(userDto)
      // let r = await this.serviceAProxy.send(username,password)({cmd:'register'},userDto);
      //let r =
      //return
      return   await this.serviceAProxy.send<any>({cmd: 'register'}, userDto)
      //console.log(r)
      //res.status(HttpStatus.OK).send({message: "User Registered Succesfully", status: true})
    }catch(error){
      // throw new HttpException('failed to create user', HttpStatus.INTERNAL_SERVER_ERROR)
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({message: 'failed to create user', status: false})
    }
    
  }

  // @Post('login-new')
  // async login(@Body() userDto: { username: string; password: string }) {
  //   console.log(userDto)
  //   try{
  //   return await this.serviceAProxy.send<any>({cmd:'login'},userDto)
  //  // res.status(HttpStatus.OK).send({message: "User Registered Succesfully", status: true})
  //   }catch(error){
  //     error.message;
  //     //res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({message: 'failed to login user', status: false})

  //   }
  // }

  @Post('login')
  async login(@Body() userDto: { username: string; password: string }) {
    console.log(userDto)
    return await this.authService.login(userDto);
  }


}
