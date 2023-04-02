import { Controller , Logger } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Controller('api/v1')
export class AppController {  

    private logger = new Logger(AppController.name);

    private clientAdminBackend: ClientProxy;

    constructor(){
        this.clientAdminBackend = ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: ['amqp://user:nomeDoUser@IP/smartranking'],
                queue: 'admin-backend'
            }
        })

    }
}
