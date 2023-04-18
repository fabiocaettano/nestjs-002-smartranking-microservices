import { Injectable } from "@nestjs/common";
import { ClientProxy, ClientProxyFactory, Transport } from "@nestjs/microservices";
require('dotenv').config({ path: '.env' })

@Injectable()
export  class ProxyClient {
    
    getClientProxyAdminBackendInstance(): ClientProxy{
        return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: [process.env.RABBITMQ_URI],
                queue: 'admin-backend',
            }
        })
    }

    getClientProxyDesafiosInstance(): ClientProxy{
        return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: [process.env.RABBITMQ_URI],
                queue: 'desafios',
            }
        })
    }
}