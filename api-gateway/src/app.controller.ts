import { Body, Controller , Get, Logger, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { CriarCategoriaDto } from './dtos/criar-categoria-dto';
import { Observable } from 'rxjs';
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
                queue: 'admin-backend',
                queueOptions: {
                  durable: false,
                },
            }
        })
    }

    @Post('categorias')
    @UsePipes(ValidationPipe)
    async criarCategoria(
        @Body() criarCategoriaDto: CriarCategoriaDto
    ){        
        this.clientAdminBackend.emit('criar_categoria', criarCategoriaDto);
    }

    @Get('categorias')
    consultaCategorias(@Query('id_categoria') _id : string): Observable<any>{

        return this.clientAdminBackend.send('consultar-categorias', _id ? _id: '')
        
    }
}
