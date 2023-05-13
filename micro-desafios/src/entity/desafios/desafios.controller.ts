import { Controller , Logger } from '@nestjs/common';
import { EventPattern, Payload, Ctx, RmqContext, MessagePattern } from '@nestjs/microservices';
import { Desafio } from './interfaces/desafio.interface';
import { DesafiosService } from './desafios.service';

const ackErrors: string[] = ['E11000']

@Controller('desafios')
export class DesafiosController {

    constructor(private readonly desafiosService: DesafiosService){}

    private readonly logger = new Logger(DesafiosController.name);

    @EventPattern('criar-desafio')
    async criarDesafio(@Payload() desafio: Desafio, @Ctx() context: RmqContext) {
        const channel = context.getChannelRef()
        const originalMsg = context.getMessage()
        try {
            this.logger.log(`desafio: ${JSON.stringify(desafio)}`)
            await this.desafiosService.criarDesafio(desafio)
            await channel.ack(originalMsg)
        } catch(error) {
            this.logger.log(`error: ${JSON.stringify(error.message)}`)
            const filterAckError = ackErrors.filter(
                ackError => error.message.includes(ackError))  
              if (filterAckError.length > 0) {
                await channel.ack(originalMsg)
              }
        }
    }
}
