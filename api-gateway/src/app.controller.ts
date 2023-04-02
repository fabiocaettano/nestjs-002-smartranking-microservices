import { Body, Controller , Logger, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { CriarCategoriaDto } from './dtos/criar-categoria-dto';
require('dotenv').config({ path: '.env' })

@Controller('api/v1')
export class AppController {  

    private logger = new Logger(AppController.name);

    private clientAdminBackend: ClientProxy;

    constructor(){
        this.clientAdminBackend = ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: [process.env.RABBITMQ_URI],
                queue: 'admin-backend'
            }
        })
    }

    @Post('categorias')
    @UsePipes(ValidationPipe)
    async criarCategoria(
        @Body() criarCategoriaDto: CriarCategoriaDto
    ){
        return await this.clientAdminBackend.emit('criar-categoria', criarCategoriaDto)
    }
}
