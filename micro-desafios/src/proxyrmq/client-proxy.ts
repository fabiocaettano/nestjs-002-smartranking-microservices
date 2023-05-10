import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
require('dotenv').config({ path: '.env' })

@Injectable()
export class ClientProxySmartRanking {

  constructor(
    private configService: ConfigService
  ) {}

    getClientProxyAdminBackendInstance(): ClientProxy {        

            return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
              urls: [process.env.RABBITMQ_URI],
              queue: 'admin-backend'
            }
          })
    }

    getClientProxyDesafiosInstance(): ClientProxy {        

      return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URI],
        queue: 'desafios'
      }
    })
}
}