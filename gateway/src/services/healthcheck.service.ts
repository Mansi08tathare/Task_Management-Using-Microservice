import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, timeout } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';

@Injectable()
export class HealthCheckMicroservicesService {
    constructor(
        @Inject('USER_SERVICE') private readonly serviceAProxy: ClientProxy,
        @Inject('TASK_SERVICE') private readonly serviceBProxy: ClientProxy,
    ) { }

    async onModuleInit() {
        console.log(await this.healthCheckUser() ? "User Module is Online" : "User Module is Offline")
        console.log(await this.healthCheckDevice() ? "Task Module is Online" : "Task Module is Offline")
    }

    onModuleDestroy() {
        this.serviceAProxy.close();
        this.serviceBProxy.close();
    }
    async healthCheckUser(): Promise<any> {
        const userMicroService = await this.serviceAProxy.send({ cmd: "user_microservice" }, {})
            .pipe(timeout(1000),
                catchError(val => {
                    return of({ success: false });
                })
            )
            .toPromise();
        return userMicroService.success
    }

    async healthCheckDevice(): Promise<any> {
        const deviceMicroService = await this.serviceBProxy.send({ cmd: "task_microservice" }, {})
            .pipe(timeout(1000),
                catchError(val => {
                    return of({ success: false });
                })
            )
            .toPromise();
        return deviceMicroService.success
    }
}
