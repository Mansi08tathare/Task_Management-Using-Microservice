// gateway/src/app.module.ts

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { HealthCheckMicroservicesService } from './services/healthcheck.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './services/login.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3002, // Connect to Service A on port 3002
        },
      },
      {
        name: 'TASK_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3003, // Connect to Service B on port 3002
        },
      },
    ]),

    // PassportModule.register({ defaultStrategy: 'jwt' }),
    //     JwtModule.register({
    //       secret: 'jfbbih56623', 
    //       signOptions: { expiresIn: '1h' },
    //     }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule], 
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') },
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot(), 
  ],
  controllers: [AppController],
  providers: [HealthCheckMicroservicesService,AuthService,JwtService,ConfigService]
})
export class AppModule {}
