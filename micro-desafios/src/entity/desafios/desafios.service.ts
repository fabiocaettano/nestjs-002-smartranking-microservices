import { Injectable, Logger} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Desafio } from './interfaces/desafio.interface';
import { Model } from 'mongoose';
import { DesafioStatus } from './../status/desafio.enum';
import { RpcException } from '@nestjs/microservices';
import * as momentTimezone from 'moment-timezone'
import { ProxyClient } from './../../proxy/proxy.client';


@Injectable()
export class DesafiosService {
    
    constructor(
        @InjectModel('Desafio') private readonly desafioModel: Model<Desafio>,
        private proxyClient: ProxyClient
        ) {}

        private readonly logger = new Logger(DesafiosService.name)

        //private clientNotificacoes =  this.proxyClient.getClientProxyNotificacoesInstance();

        async criarDesafio(desafio: Desafio): Promise<Desafio> {
            try {
                const desafioCriado = new this.desafioModel(desafio)
                desafioCriado.dataHoraSolicitacao = new Date()
                /*
                    Quando um desafio for criado, definimos o status 
                    desafio como pendente
                */
                desafioCriado.status = DesafioStatus.PENDENTE
                this.logger.log(`desafioCriado: ${JSON.stringify(desafioCriado)}`)
                /*
                    Adequação para contemplar o envio do desafio para o 
                    microservice notificações
                */
                await desafioCriado.save()

                //return await this.clientNotificacoes.emit('notificacao-novo-desafio', desafio).toPromise()

                return desafioCriado;

            } catch (error) {
                this.logger.error(`error: ${JSON.stringify(error.message)}`)
                throw new RpcException(error.message)
            }
        }
}
