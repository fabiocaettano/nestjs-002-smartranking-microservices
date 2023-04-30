import { Controller, Logger } from '@nestjs/common';
import { JogadoresService } from './jogadores.services';
import { EventPattern, Payload, Ctx, RmqContext, MessagePattern } from '@nestjs/microservices';
import { Jogador } from './interfaces/jogador.interface'

const ackErrors: string[] = ['E11000']

@Controller()
export class JogadoresController {

    logger = new Logger(JogadoresController.name)
    constructor(private readonly jogadoresService: JogadoresService) {}

    @EventPattern('criar-jogador')
    async criarJogador(@Payload() jogador: Jogador, @Ctx() context: RmqContext) {
        const channel = context.getChannelRef()
        const originalMsg = context.getMessage()
        try {
            this.logger.log(`jogador: ${JSON.stringify(jogador)}`)
            await this.jogadoresService.criarJogador(jogador)
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

   @MessagePattern('consultar-jogadores')
   async consultarJogadores(@Payload() _id: string, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef()
    const originalMsg = context.getMessage()
    try {
       if (_id) {
            return await this.jogadoresService.consultarJogadorPeloId(_id);
       } else {
            return await this.jogadoresService.consultarTodosJogadores();  
       } 
    } finally {
        await channel.ack(originalMsg)
    }      
   }

   @MessagePattern('consultar-jogador-pelo-id')
   async consultarJogadorPeloId(@Payload() _id: string, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef()
    const originalMsg = context.getMessage()
    try {
       
       return await this.jogadoresService.consultarJogadorPeloId(_id);
       
    } finally {
        await channel.ack(originalMsg)
    }      
   }

   @MessagePattern('consultar-jogador-pela-categoria')
   async consultarJogadorPeloCategoria(@Payload() categorias : string, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef()
    const originalMsg = context.getMessage()

    this.logger.log(`originalMsg: ${originalMsg}`)
    try {
       
       return await this.jogadoresService.consultarJogadorPelaCategoria(categorias);
       
    } finally {
        await channel.ack(originalMsg)
    }      
   }


   @EventPattern('atualizar-jogador')
   async atualizarJogador(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef()
    const originalMsg = context.getMessage()
    try {
        console.log(`data: ${JSON.stringify(data)}`)
        const _id: string = data._id        
        const jogador: Jogador = data.jogador
        await this.jogadoresService.atualizarJogador(_id, jogador);
        await channel.ack(originalMsg)
    } catch(error) {
        const filterAckError = ackErrors.filter(
            ackError => error.message.includes(ackError))

          if (filterAckError.length > 0) {
            await channel.ack(originalMsg)
          }
    }  
}

    @EventPattern('deletar-jogador')
    async deletarJogador(@Payload() _id: string, @Ctx() context: RmqContext) {
        const channel = context.getChannelRef()
        const originalMsg = context.getMessage()
        try {
            await this.jogadoresService.deletarJogador(_id)
            await channel.ack(originalMsg)
        } catch(error) {
            const filterAckError = ackErrors.filter(
                ackError => error.message.includes(ackError))
    
              if (filterAckError.length > 0) {
                await channel.ack(originalMsg)
              }
        }
    }
}