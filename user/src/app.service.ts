// import { Injectable } from '@nestjs/common';
// import { hash } from 'bcrypt'; 
// import { Model } from 'mongoose';
// import { User } from './user.schema';
// import { InjectModel } from '@nestjs/mongoose';
// import { compare } from 'bcrypt';

// @Injectable()
// export class AppService {
//   constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

//   getHello(): string {
//     return 'Hello World!';
//   }

//   async register(data: { username: string, password: string ,id:Number,role:String}): Promise<User> {
//     const { username, password ,id,role} = data;
//     const hashedPassword = await hash(password, 10); 
//     console.log(username,hashedPassword,id,role)

  
//     const user = new this.userModel({id, username, password: hashedPassword ,role});
//     return await user.save();
//   }


//   async login(data: { username: string; password: string }) {
//     const { username, password } = data;
  
//     const user = await this.userModel.findOne({ username });
//     console.log('Data received in login method:', data);
  
//     if (!user) {
//       return { loggedIn: false }; 
//     }
  
//     const isPasswordValid = await compare(password, user.password);
  
//     if (!isPasswordValid) {
//       return { loggedIn: false }; 
//     }
  
   
//     return { loggedIn: true };
//   }
// }

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash, compare } from 'bcrypt';
import { User } from './user.entity';
import { UserDTO } from './user.dto';
import { UserRole } from './role.enum';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async register(data: UserDTO): Promise<User> {
    const { username, password, role } = data;
    const hashedPassword = await hash(password, 10);
    const user = new User();
    user.username = username;
    user.password = hashedPassword;
    user.role = role as UserRole;
    return await this.userRepository.save(user);
  }

  async login(data: { username: string; password: string }) {
    const { username, password } = data;
    //const user = await this.userRepository.findOne({ username });
    const user = await this.userRepository.findOne({ where: { username } });


    if (!user) {
      return { loggedIn: false };
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      return { loggedIn: false };
    }

    return { loggedIn: true };
  }
}

