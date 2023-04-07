import { Controller, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { Ctx, EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { Categoria } from './interfaces/categorias/categoria.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  logger = new Logger(AppController.name);

  @EventPattern('criar_categoria')
  async criarCategoria(
    @Payload() categoria: Categoria, @Ctx() context: RmqContext
  ){
    const channel = context.getChannelRef()
    const originalMsg = context.getMessage()

    this.logger.log(`categoria: ${JSON.stringify(categoria)}`);
    this.appService.criarCategoria(categoria);
    await channel.ack(originalMsg);
  }  

  @MessagePattern('consultar-categorias')
  async consultarCategorias(@Payload() _id: string){
    if (_id){
      return await this.appService.consultarCategoriaPeloId(_id);
    }else{
      return await this.appService.consultarTodasCategorias();
    }
  }
}
