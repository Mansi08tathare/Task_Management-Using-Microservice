
import { Inject, Injectable} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(
    
    private readonly jwtService: JwtService,
    @Inject('USER_SERVICE') private readonly serviceAProxy: ClientProxy
    
  ) {}


async login(userDto: { username: string; password: string }) {
    const { username, password } = userDto;
  
    console.log(userDto);
  
   
    const response = await this.serviceAProxy.send({ cmd: 'login' }, { username, password }).toPromise();
  
    if (response && response.loggedIn) { 
      const token = this.generateToken({ username });
      return { access_token: token };
    } else {
      return { message: 'Invalid credentials' };
    }
  }
  
  
  generateToken(payload: { username: string }): string {
    return this.jwtService.sign(payload);
  }
  }