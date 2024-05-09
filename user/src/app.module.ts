// service-b/src/app.module.ts

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
// import { MongooseModule } from '@nestjs/mongoose';
// import { UserSchema } from './user.schema';
import { AppService } from './app.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  imports: [
    
    // MongooseModule.forRoot('mongodb://127.0.0.1:27017/microservice'),
    // MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    // ConfigModule.forRoot({
    //   isGlobal: true, // Make ConfigModule available to all modules
    // }),
    TypeOrmModule.forFeature([User]),
    
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Shilpa@2001',
      database: 'Task-microservice',
      entities: [__dirname, '**', '*.entity.{ts,js}'],
      autoLoadEntities: true,
      synchronize: true
    }),
    
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3002, // Assuming Service B runs on port 3002
        },
      },
    ]),
  ],
  providers:[AppService,JwtService,ConfigService],
  controllers: [AppController],
})
export class AppModule {}
