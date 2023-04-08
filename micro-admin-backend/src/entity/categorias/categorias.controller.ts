import { Controller, Logger } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { Ctx, EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { Categoria } from './interfaces/categoria.interface';

const ackErrors: string[] = ['E1100'];

@Controller()
export class CategoriasController {
  constructor(private readonly appService: CategoriasService) {}

  logger = new Logger(CategoriasController.name);

  @EventPattern('criar_categoria')
  async criarCategoria(
    @Payload() categoria: Categoria, @Ctx() context: RmqContext
  ){
    const channel = context.getChannelRef()
    const originalMsg = context.getMessage()

    try{      
      await this.appService.criarCategoria(categoria);
      await channel.ack(originalMsg);
    }catch(error){
      this.logger.log(`categoria: ${JSON.stringify(categoria)}`);
      
      /*ackErrors.map( async ackError => {
        if(error.message.includes(ackError)){
          await channel.ack(originalMsg)
        }
      })*/

      const filterAckError = ackErrors.filter(
        ackError => error.message.includes(ackError))

      if (filterAckError){
        await channel.ack(originalMsg);
      }      
    }
  }  

  @MessagePattern('consultar-categorias')
  async consultarCategorias(@Ctx() context: RmqContext){
    const channel = context.getChannelRef();
    const originalMsg =  context.getMessage();
    try{      
        return await this.appService.consultarTodasCategorias();      
    }finally{
      await channel.ack(originalMsg);
    }    
  }

  @MessagePattern('consultar-categoria-pelo-id')
  async consultarCategoria(@Payload() categoria: string, @Ctx() context: RmqContext){
    const channel = context.getChannelRef();
    const originalMsg =  context.getMessage();

    console.log(categoria)

    try{      
        return await this.appService.consultarCategoriaPeloId(categoria);      
    }finally{
      await channel.ack(originalMsg);
    }    
  }

  @EventPattern('atualizar-categoria')
  async atualizarCategoria(
    @Payload() data: any, @Ctx() context: RmqContext){
      const channel = context.getChannelRef()
      const originalMsg = context.getMessage()
      this.logger.log(`data: ${JSON.stringify(data)}`);
      try{
        const categoria: string = data.categoria;
        const atualizar_categoria: Categoria = data.atualizar_categoria;
        await this.appService.atualizarCategoria(categoria, atualizar_categoria);
        await channel.ack(originalMsg);
      }catch(error){
        const filterAckError = ackErrors.filter(
          ackError => error.message.includes(ackError))
  
        if (filterAckError){
          await channel.ack(originalMsg);
        } 
      }
  }
}